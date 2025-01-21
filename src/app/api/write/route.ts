import writeCoverLetter from "@/lib/services/writeCoverLetter";
import { z } from 'zod';

/*
Structure of the request body:
{
    "aboutTheJob": "string",
    "question": "string"
}
*/
export async function POST(req: Request) {

    const requestSchema = z.object({
        aboutTheJob: z.string().min(1),
        question: z.string().min(1)
    });

    try {
        requestSchema.parse(await req.json());
    } catch (error) {
        return Response.json(
            { error: 'Invalid request body: ' + error },
            { status: 400 }
        );
    }
    
    const { aboutTheJob, question } = await req.json();
    
    return Response.json({
        response: writeCoverLetter(aboutTheJob, question)
    }, { status: 200 })
}
