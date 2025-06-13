import { OpenAI } from 'openai';
import config from '@infrastructure/config';

const normalizeText = (text: string) =>
  text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();

export const getEmbedding = async (text: string): Promise<number[]> => {
  try {
    
    const openai = new OpenAI({ apiKey: "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" });

    let cleanedText = normalizeText(text);
    if (cleanedText.length > 2000) cleanedText = cleanedText.slice(0, 2000);

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: cleanedText,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('❌ Error al obtener embedding:', error);
    return [];
  }
};
