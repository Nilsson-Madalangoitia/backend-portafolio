import mammoth from 'mammoth';

export const extractWordText = async (buffer: Buffer): Promise<string> => {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;  // Solo el texto plano
};