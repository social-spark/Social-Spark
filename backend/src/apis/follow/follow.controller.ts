import {Request, Response} from 'express'
import {
    deleteFollow,
    insertFollow, selectFollowByFollowId,
    selectFollowsByFollowingProfileId,
    selectFollowsByFollowedProfileId, Follow
} from "./follow.model";
import {Status} from "../../utils/interfaces/Status";
import {zodErrorResponse} from "../../utils/response.utils";
import {FollowSchema} from "./follow.validator";
import {z} from "zod";


/**
 * Handles GET request for all follows associated with a profile
 * @param request object containing the follow profile id
 * @param response object containing the status of the request and the follows associated with the profile
 * @returns status object containing the status of the request and the follows associated with the profile
 */
export async function getFollowsByFollowingProfileIdController(request: Request, response: Response): Promise<Response> {
    try {

        // validate the followingProfileId coming from the request parameters
        const validationResult = z.string({required_error: "following profile id is required", invalid_type_error: "following profile id is the wrong type"}).uuid("Please provide a valid followingProfileId").safeParse(request.params.followingProfileId)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // if the validation succeeds, continue

        // deconstruct the follow profile id from the request parameters
        const followingProfileId = validationResult.data

        // select the follows by follow profile id
        const data = await selectFollowsByFollowingProfileId(followingProfileId)

        // return the status and the follows associated with the profile
        return response.json({status: 200, message: null, data})

        // if an error occurs, return the error to the user
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

/**
 * Handles GET request for all follows associated with a profile that is being followed
 * @param request object containing the follow following profile id
 * @param response object containing the status of the request and the follows associated with the profile
 * @returns status object containing the status of the request and the follows associated with the profile
 */
export async function getFollowsByFollowedProfileIdController(request: Request, response: Response): Promise<Response> {
    try {

        // validate the followingProfileId coming from the request parameters
        const validationResult = z.string({required_error: "followed profile id is required", invalid_type_error: "followed profile id is the wrong type"}).uuid("Please provide a valid followedProfileId").safeParse(request.params.followedProfileId)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // if the validation succeeds, continue

        // deconstruct the follow following profile id from the request parameters
        const followedProfileId = validationResult.data

        // select the follows by follow following profile id
        const data = await selectFollowsByFollowedProfileId(followedProfileId)

        // return the status and the follows associated with the profile
        return response.json({status: 200, message: null, data})

        // if an error occurs, return the error to the user
    } catch (error) {
        console.error(error)
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

/**
 * Handles POST request to insert a new follow into the database
 * @param request object containing the follow profile id and the follow following profile id
 * @param response object containing the status of the request and the follow that was inserted
 * @returns status object containing the status of the request and the follow that was inserted
 */
export async function postFollowController (request: Request, response: Response): Promise<Response> {
    try {

        // validate the incoming request with the follow schema
        const validationResult = FollowSchema.safeParse(request.body)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // if the validation succeeds, continue on with postFollowController logic below this line

        // deconstruct the follow profile id and the follow following profile id from the request body
        const {followingProfileId, followedProfileId} = validationResult.data
        const result = await insertFollow({followingProfileId, followedProfileId, followDateCreated: null})

        return response.json({status: 200, message: null, data: result})
    } catch (error) {
        return response.json({status: 500, message: 'Posting the follow failed. Please try again.', data: null})
    }
}

/**
 * Handles DELETE request to delete a follow from the database
 * @param request object containing the follow profile id and the follow following profile id
 * @param response object containing the status of the request and the follow that was deleted
 * @returns status object containing the status of the request and the follow that was deleted
 */
export async function deleteFollowController (request: Request, response: Response): Promise<Response> {
    try {
        const {followingProfileId, followedProfileId} = request.body
        const result = await insertFollow({followingProfileId, followedProfileId, followDateCreated: null})
        return response.json({status: 200, message: null, data: result})
    } catch (error) {
        return response.json({status: 500, message: 'Deleting the follow failed. Please try again.', data: null})
    }
}

/**
 * Handles POST request to toggle a follow in the database
 * @param request object containing the follow following profile id and the follow profile id
 * @param response object containing the status of the request and the follow that was inserted or deleted
 * @returns status object containing the status of the request and the follow that was inserted or deleted
 */
export async function toggleFollowController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {followedProfileId} = request.body
        // @ts-ignore
        const followingProfileId = request.session.profile.profileId

        const follow: Follow = {
            followingProfileId,
            followedProfileId,
            followDateCreated: null
        }

        // create a status object
        const status: Status = {
            status: 200,
            message: '',
            data: null
        }

        const selectedFollow = await selectFollowByFollowId(follow)

        if(selectedFollow === null) {
            status.message = await insertFollow(follow)
        } else {
            status.message = await deleteFollow(follow)
        }

        // return the status to the user
        return response.json(status)

        // if an error occurs, return the error to the user
    } catch (error: any) {
        return (response.json({status: 500, data: null, message: error.message}))
    }
}