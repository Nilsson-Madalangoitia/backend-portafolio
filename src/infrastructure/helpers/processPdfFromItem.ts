import { extractPdfText } from '../helpers/extractPdfText';
import { splitText } from '../helpers/splitText';
import { getEmbedding } from '../helpers/getEmbedding';
import { index } from '../helpers/pinecone';

export const processPdfFromItem = async (item: any) => {
  // Extraer texto desde el Buffer
  const text = await extractPdfText(item.buffer);

  // Fragmentar texto
  const chunks = splitText(text);

  // Generar embedding por fragmento
  const vectors = await Promise.all(chunks.map(async (chunk: string, i: number) => ({
    id: `${item._id}-${i}`,
    values: await getEmbedding(chunk),
    metadata: {
      text: chunk,
      fileId: String(item._id),
      filename: item.nombre,
    },
  })));

  // Subir a Pinecone (nuevo SDK → directo)
  await index.upsert(vectors);

  return { totalChunks: vectors.length };
};