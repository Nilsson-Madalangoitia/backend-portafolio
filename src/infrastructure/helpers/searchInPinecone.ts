import { getEmbedding } from '../helpers/getEmbedding';
import { index } from '../helpers/pinecone';
import { extractAnswer } from '../helpers/gptConsulta';

export const searchInPinecone = async (question: string, userid: string) => {
  console.log("🔍 Pregunta:", question);

  // Obtener el embedding de la pregunta
  const questionEmbedding = await getEmbedding(question);
  if (questionEmbedding.length === 0) return [];

  try {
    // Consultar Pinecone
    const queryResult = await index.query({
      vector: questionEmbedding,
      topK: 10, // Puedes ajustar este número
      includeMetadata: true,
      filter: { fileId: userid }
    });

    // Filtrar resultados relevantes por similitud
    const relevantMatches = queryResult.matches?.filter(match => match.score >= 0.45) || [];
    if (relevantMatches.length === 0) return [];

    // Calcular score promedio y porcentaje de exactitud
    const averageScore = relevantMatches.reduce((sum, match) => sum + match.score, 0) / relevantMatches.length;
    const accuracyPercentage = Math.round(averageScore * 100);

    // Combinar todo el texto relevante en un solo contexto
    const fullContext = relevantMatches.map(match => match.metadata?.text || "").join("\n");

    // Extraer la respuesta usando GPT
    const cleanAnswer = await extractAnswer(question, fullContext);

    // Retornar una sola respuesta limpia con accuracy
    return [{
      text: cleanAnswer,
      filenames: relevantMatches.map(m => m.metadata?.filename),
      accuracy: `${accuracyPercentage}%`,
      scoreRange: {
        min: Math.min(...relevantMatches.map(m => m.score)),
        max: Math.max(...relevantMatches.map(m => m.score)),
      }
    }];

  } catch (error) {
    console.error("❌ Error en la búsqueda en Pinecone:", error);
    return [];
  }
};
