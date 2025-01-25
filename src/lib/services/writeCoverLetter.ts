const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

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
  const systemPrompt = `You are a professional cover letter writer. Write a response to the following job application question based on the job description provided. Write a final human-like simple english response in without any blanks, like [Previous Company Name] or [Previous Job Title].`;

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
