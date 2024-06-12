import { Request, Response } from 'express'
import {dataDownloader} from "../utils/promptDownloader";

export async function indexController (request: Request, response: Response){
    await dataDownloader()
    return response.json('🤯 😬 😱')
}