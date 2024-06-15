import {sql} from "../../utils/database.utils";
import {z} from "zod";


const PromptSchema = z.object({
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
    promptDate: z.coerce.date({
        required_error: 'prompt date is required',
        invalid_type_error: 'please provide a valid prompt date'
    })
})
export type Prompt= z.infer<typeof PromptSchema>
export async function selectAllPrompts(): Promise<Prompt[]> {
    const result = sql<Prompt[]>`SELECT prompt_id, prompt_category, prompt_body, prompt_date FROM prompt`
    return PromptSchema.array().parse(result)
}

export async function selectPromptByPromptId(promptId: string): Promise<Prompt | null> {
    const rowlist = await sql<Prompt[]>`SELECT prompt_id, prompt_category, prompt_body, prompt_date FROM prompt WHERE prompt_id = ${promptId}`
    const result = PromptSchema.array().max(1).parse(rowlist)
    return result.length === 1 ? result[0] : null
}

export async function selectAllPromptsByCategory(promptCategory: string): Promise<Prompt[]> {
    const result = await sql<Prompt[]>`SELECT prompt_id, prompt_category, prompt_body, promt_date
                                       FROM prompt
                                       WHERE prompt_category = ${promptCategory}`
   return PromptSchema.array().parse(result)
}

export async function selectAllPromptsByDate(promptDate: Date): Promise<Prompt[]> {
    const formattedStartDate =`${promptDate.getFullYear()}-${promptDate.getMonth() + 1}-${promptDate.getDate()} 00:00:00`
    const formattedEndDate = `${promptDate.getFullYear()}-${promptDate.getMonth() + 1}-${promptDate.getDate()} 23:59:59`
    const result = await sql<Prompt[]>`SELECT prompt_id, prompt_category, prompt_body, prompt_date 
    FROM prompt WHERE prompt_date between ${formattedStartDate} and ${formattedEndDate}`
    return PromptSchema.array().parse(result)

}

