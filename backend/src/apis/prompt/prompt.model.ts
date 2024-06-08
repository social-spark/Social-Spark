import {sql} from "../../utils/database.utils";

export interface Prompt {
    promptId: string | null
    promptType: string
    promptValue: string
}

export async function selectAllPrompts(): Promise<Prompt[]> {
    return sql<Prompt[]>`SELECT prompt_id, prompt_category, prompt_body FROM prompt`
}

export async function selectPromptByPromptId(promptId: string): Promise<Prompt | null> {
    const result = await sql<Prompt[]>`SELECT prompt_id, prompt_category, prompt_body FROM prompt WHERE prompt_id = ${promptId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectAllPromptsByCategory(promptCategory: string): Promise<Prompt | null> {
    const result = await sql<Prompt[]>`SELECT prompt_id, prompt_category, prompt_body 
    FROM prompt WHERE prompt_category = ${promptCategory}`
    return result?.length === 1 ? result[0] : null
}

export async function selectPromptsByPostId(postId: string): Promise<Prompt[]> {
    const result = await sql<Prompt[]>

        `SELECT prompt_id,
        prompt_category,
        prompt_body
        FROM prompt
        INNER JOIN post on prompt.prompt_id  = post.post_prompt_id WHERE post.post_id = ${postId}`;

    return result
}
