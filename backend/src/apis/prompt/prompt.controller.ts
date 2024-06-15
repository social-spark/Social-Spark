import {Request, Response} from 'express'
import {
    selectAllPrompts,
    selectAllPromptsByCategory,
    selectPromptByPromptId,
    selectAllPromptsByDate, Prompt,
} from './prompt.model'
import {Status} from "../../utils/interfaces/Status";
import {z} from "zod";

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

export async function getPromptByPromptId(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {promptId} = request.params
        const validationResult = z.string({required_error: 'promptId is required', invalid_type_error: 'Please provide a valid promptId'}).uuid({ message: 'please provide a valid promptId' }).safeParse(promptId)
        if (!validationResult.success) {
            return response.json({
                status: 418,
                message: validationResult.error.message,
                data: null
            })
        }
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
        const validationResult = z.string({required_error: 'prompt category is required', invalid_type_error: 'please provide a valid prompt category'}).trim().min(1, { message: 'please provide a valid prompt category (min 1 characters)' }).max(32, { message: 'please provide a valid prompt category (max 32 characters)' }).safeParse(promptCategory)
        if (!validationResult.success) {
            return response.json({
                status: 418,
                message: validationResult.error.message,
                data: null
            })
        }
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

export async function getAllPromptsByDate(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {promptDate} = request.params
        const validationResult = z.coerce.date({required_error: 'prompt date is required', invalid_type_error: 'please provide a valid prompt date'}).safeParse(promptDate)
        if (!validationResult.success) {
            return response.json({
                status: 418,
                message: validationResult.error.message,
                data: null
            })
        }
        console.log("i made it")
        const data = await selectAllPromptsByDate(validationResult.data)
        return response.json({status: 200, message: null, data})
    } catch (error) {
        return response.json({
            status: 500,
            message: "",
            data: null
        })
    }
}