import { getEmbedding } from '../helpers/getEmbedding';
import { index } from '../helpers/pinecone';

export const searchInPinecone = async (question: string) => {
  console.log("🔍 Pregunta:", question);

  const questionEmbedding = await getEmbedding(question);
  if (questionEmbedding.length === 0) return [];

  try {
    const queryResult = await index.query({
      vector: questionEmbedding,
      topK: 10,
      includeMetadata: true
    });

    const relevantMatches = queryResult.matches?.filter(match => match.score > 0.55) || [];

    return relevantMatches.map(match => ({
      score: match.score,
      text: match.metadata?.text,
      filename: match.metadata?.filename,
    }));
  } catch (error) {
    console.error("❌ Error en la búsqueda en Pinecone:", error);
    return [];
  }
};
