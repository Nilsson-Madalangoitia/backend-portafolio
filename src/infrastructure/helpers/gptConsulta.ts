import { OpenAI } from 'openai';
import config from "@infrastructure/config";

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

export const extractAnswer = async (question: string, context: string): Promise<string> => {
  console.log(context)
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // o "gpt-4"
    max_tokens: 150, // Limita el tamaño de la respuesta (~3 párrafos)
    messages: [
      {
        role: "system",
        content: "Eres un asistente que responde únicamente con base en el texto proporcionado. No inventes, no completes, no asumas.Responde en máximo 3 oraciones y solamente con contenido que esté presente en el texto.`.",
      },
      {
        role: "user",
        content: `Pregunta: ${question}\nTexto: ${context}`,
      },
    ],
  });

  return completion.choices[0].message.content?.trim() || "";
};