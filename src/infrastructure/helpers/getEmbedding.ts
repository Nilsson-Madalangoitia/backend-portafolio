import { OpenAI } from 'openai';
import config from "@infrastructure/config";

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

export const getEmbedding = async (text: string): Promise<number[]> => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return response.data[0].embedding;
};