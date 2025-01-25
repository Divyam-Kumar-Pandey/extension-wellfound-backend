import writeCoverLetter from "@/lib/services/writeCoverLetter";
import {z} from "zod";

/*
Structure of the request body:
{
    "aboutTheJob": "string",
    "question": "string"
}
*/
export async function POST(request: Request): Promise<Response> {
  const requestSchema = z.object({
    aboutTheJob: z.string().min(1),
    question: z.string().min(1)
  });

  // Read the request body once and store it
  let responseBody;
  try {
    responseBody = await request.json();
    // Validate the parsed body
    requestSchema.parse(responseBody);
  } catch (error) {
    return Response.json({error: "Invalid request body: " + error}, {status: 400});
  }


  return Response.json(
    {
      response: await writeCoverLetter(responseBody.aboutTheJob, responseBody.question)
    },
    {status: 200}
  );
}
