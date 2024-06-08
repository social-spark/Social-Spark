import {Request, Response} from 'express'
import {
    selectAllPrompts,
    selectAllPromptsByCategory,
    selectPromptByPromptId,
    selectPromptsByPostId
} from './prompt.model'
import {Status} from "../../utils/interfaces/Status";

export async function getAllPromptsController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllPrompts()
        const status: Status = {status: 200, message: null, data}
        return response.json(status)
    } catch (error) {
        return response.json({
            status: 500,
            message: "",
            data: []
        })
    }
}

export async function getPromptsByPromptId(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {promptId} = request.params
        const data = await selectPromptByPromptId(promptId)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json({
            status: 500,
            message: "",
            data: null
        })
    }
}

export async function getAllPromptsByCategory(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {promptCategory} = request.params
        const data = await selectAllPromptsByCategory(promptCategory)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json({
            status: 500,
            message: "",
            data: null
        })
    }
}
export const getPromptsByPostId = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params; // Assuming postId is in the URL parameters
    try {
        const prompts = await selectPromptsByPostId(postId); // Call your async function to get prompts
        res.status(200).json(prompts); // Send the prompts as JSON response
    } catch (error) {
        console.error('Error fetching prompts:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response if something goes wrong
    }
};