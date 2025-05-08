import { Pinecone } from '@pinecone-database/pinecone';
import config from "@infrastructure/config";

const pinecone = new Pinecone({
    apiKey: config.PINECONE_API_KEY!,
  });
  
  // Nombre de tu índice (ya creado en Pinecone)
  const indexName = config.PINECONE_INDEX_NAME!;
  
  export const index = pinecone.index(indexName);