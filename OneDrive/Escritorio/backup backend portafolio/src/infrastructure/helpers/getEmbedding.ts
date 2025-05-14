import { OpenAI } from 'openai';
import config from "@infrastructure/config";

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

export const getEmbedding = async (text: string): Promise<number[]> => {
  try {
    const trimmed = text.trim().replace(/\n/g, " ");
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: trimmed,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("❌ Error al obtener embedding:", error);
    return []; // Previene caída del sistema
  }
};
