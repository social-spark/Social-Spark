import { z } from 'zod'


export const PromptSchema = z.object({
    promptId: z.string({
        required_error: 'promptId is required',
        invalid_type_error: 'Please provide a valid promptId'
    })
        .uuid({ message: 'please provide a valid promptId' }),

    promptCategory: z.string({required_error: 'prompt category is required',
        invalid_type_error: 'please provide a valid prompt category'})
        .trim()
        .min(1, { message: 'please provide a valid prompt category (min 1 characters)' })
        .max(32, { message: 'please provide a valid prompt category (max 32 characters)' }),


promptBody: z.string({
        required_error: 'prompt body is a required field.',
        invalid_type_error: 'please provide a valid profile about'
    })
        .max(128, { message: 'prompt body length is too long' })
        .nullable(),
})


export type Prompt = z.infer<typeof PromptSchema>

export async function fetchPromptByPromptId(promptId: string): Promise<Prompt> {
    const { data } = await fetch(`${process.env.PUBLIC_API_URL}/apis/prompt/${promptId}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },

    }).then((response: Response) => {
        if (!response.ok) {
            throw new Error('Error fetching profile')
        } else {
            return response.json()
        }

    })

    return PromptSchema.parse(data)

}