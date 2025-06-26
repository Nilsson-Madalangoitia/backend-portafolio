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
