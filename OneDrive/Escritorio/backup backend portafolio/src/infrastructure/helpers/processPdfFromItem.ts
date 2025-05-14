import { extractPdfText } from '../helpers/extractPdfText';
import { extractPptxText } from '../helpers/extractPptText';
import { extractWordText } from '../helpers/extractDocText';
import { splitText } from '../helpers/splitText';
import { getEmbedding } from '../helpers/getEmbedding';
import { index } from '../helpers/pinecone';

export const processPdfFromItem = async (item: any, tipo: string) => {

  var text: string = '';
  
  switch (tipo) {
    case "application/pdf":
      console.log('Opción pdf seleccionada');
      text = await extractPdfText(item.file.buffer);
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      console.log('Opción doc seleccionada');
      text = await extractWordText(item.file.buffer);
      break;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      console.log('Opción ppt seleccionada');
      text = await extractPptxText(item.file.buffer);
      break;
    default:
      console.log('Opción no válida');
      break;
  }

  // Fragmentar texto
  const chunks = splitText(text);

  // Generar embedding por fragmento
  const vectors = await Promise.all(chunks.map(async (chunk: string, i: number) => ({
    id: `${item.id}-${i}`,
    values: await getEmbedding(chunk),
    metadata: {
      text: chunk,
      fileId: String(item.id),
      filename: item.nombre,
    },
  })));

  // Subir a Pinecone (nuevo SDK → directo)
  await index.upsert(vectors);

  return { totalChunks: vectors.length };

};