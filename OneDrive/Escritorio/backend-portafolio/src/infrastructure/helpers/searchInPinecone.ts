import { getEmbedding } from '../helpers/getEmbedding';
import { index } from '../helpers/pinecone';
import { extractAnswer } from '../helpers/gptConsulta';

export const searchInPinecone = async (question: string, userid: string) => {
  console.log("🔍 Pregunta:", question);

  // Obtener el embedding de la pregunta, con normalización
  const questionEmbedding = await getEmbedding(question);
  if (questionEmbedding.length === 0) return [];

  try {
    // Consulta más amplia (topK alto) pero se filtra luego por similitud fuerte
    const queryResult = await index.query({
      vector: questionEmbedding,
      topK: 10, // Buscar más para mejores resultados
      includeMetadata: true,
      filter: { fileId: userid }
    });

    // Filtrado estricto para mejorar la precisión
    const relevantMatches = queryResult.matches?.filter(match => match.score > 0.55) || [];

    // Retornar solo información útil
    const results = await Promise.all(
      relevantMatches.map(async (match) => {
        const cleanAnswer = await extractAnswer(question, String(match.metadata?.text || ""));

        return {
          score: match.score,
          text: cleanAnswer,
          filename: match.metadata?.filename,
        };
      })
    );

    return results;

  } catch (error) {
    console.error("❌ Error en la búsqueda en Pinecone:", error);
    return [];
  }
};