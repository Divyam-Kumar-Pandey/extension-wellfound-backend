import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1000,
  responseMimeType: "text/plain",
};

export default async function writeCoverLetter(aboutTheJob: string, question: string) {
  const systemPrompt = `You are a professional cover letter writer. Write a response to the following job application question based on the job description provided. Write a final human-like simple english response in without any blanks, like [Previous Company Name] or [Previous Job Title]. Do not write any blanks. Do not write any placeholders. Do not mention 'as advertised on ' or 'as advertised'. If you given to write a cover letter, starting with Dear Hiring Manager. If you are given to write a response to a question, write a final human-like simple english response in without any blanks, within 150 words.`;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{text: systemPrompt}]
        },
        {
          role: "user",
          parts: [{text: `Job Description: ${aboutTheJob}`}]
        }
      ],
    });

    const result = await chatSession.sendMessage(question);
    return result.response.text();
  } catch (error) {
    console.error("Error in writeCoverLetter:", error);
    throw new Error(`Failed to generate cover letter: ${error}`);
  }
}
