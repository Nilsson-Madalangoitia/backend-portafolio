import { OpenAI } from 'openai';
import config from "@infrastructure/config";

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

export const extractAnswer = async (question: string, context: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // o "gpt-4"
    messages: [
      {
        role: "system",
        content: "Extrae solo la parte más relevante del texto que responde a la pregunta. No agregues nada más.",
      },
      {
        role: "user",
        content: `Pregunta: ${question}\nTexto: ${context}`,
      },
    ],
  });

  return completion.choices[0].message.content?.trim() || "";
};