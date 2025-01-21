import {OpenAI} from "openai";

const apiKey = process.env.API_KEY;
const baseURL = process.env.BASE_URL;

async function writeCoverLetter(aboutTheJob: string, question: string) {
  const api = new OpenAI({
    apiKey,
    baseURL
  });

  const completion = await api.chat.completions.create({
    model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a professional cover letter writer. You will help me write a cover letter for a job application. You will answer the given question based on the job description. Here is the job description: " +
          aboutTheJob
      },
      {
        role: "user",
        content: question
      }
    ],
    temperature: Number(process.env.TEMPERATURE),
    max_tokens: Number(process.env.MAX_TOKENS)
  });
    
  return completion.choices[0].message.content;
}

export default writeCoverLetter;
