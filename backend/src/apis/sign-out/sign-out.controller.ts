import {Status} from "../../utils/interfaces/Status";
import { Request, Response } from 'express';

/**
 * Handles the logic or signing out user by destroying the session and returning a response to the client indicating success
 * @param request
 * @param response
 */

export function signOutController(request: Request, response: Response): Response {
    //deconstruct the session object from the request
    const {session} = request
    //destroy the session
    session?.destroy(() => {})
    //create a status object to send back to the client
    const status: Status = {status: 200, message: 'sign out successful', data: null}
    //return the status
    return response.json(status)
}