import { getEmbedding } from '../helpers/getEmbedding';
import { index } from '../helpers/pinecone';

export const searchInPinecone = async (question: string, fileId: string) => {
  // Convierte la pregunta a embedding
  const questionEmbedding = await getEmbedding(question);

  // Busca en Pinecone (filtrando por fileId opcional)
  const queryResult = await index.query({
    vector: questionEmbedding,
    topK: 10, // Devuelve los 2 fragmentos más similares
    includeMetadata: true,
    filter: {
      fileId: fileId,  // Solo del PDF actual
    },
  });

  // Solo devolvemos los fragmentos con buena similitud (> 0.75)
  const relevantMatches = queryResult.matches.filter(match => match.score > 0.80);

  return relevantMatches.map(match => ({
    score: match.score,
    text: match.metadata?.text,
    filename: match.metadata?.filename,
  }));

};