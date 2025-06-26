import pdf from 'pdf-parse';

export const extractPdfText = async (buffer: Buffer): Promise<string> => {
  const data = await pdf(buffer);
  return data.text.replace(/\s+/g, " ").trim();
};