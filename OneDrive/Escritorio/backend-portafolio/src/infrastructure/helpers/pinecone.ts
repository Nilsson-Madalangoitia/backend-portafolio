import { Pinecone } from '@pinecone-database/pinecone';
import config from "@infrastructure/config";

const pinecone = new Pinecone({
    apiKey: "pcsk_3KcZ2k_DXJD57B6n5aMvXTtUcTWhJUDtBAoGkjR1RgjDLbTDT43xKCikTDVJ45zzrytrKB",
  });
  
  // Nombre de tu índice (ya creado en Pinecone)
  const indexName = "portafolio";
  
  export const index = pinecone.index(indexName);