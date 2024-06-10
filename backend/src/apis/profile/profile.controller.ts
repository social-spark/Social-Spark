import {Request, Response} from "express";
import {
    deleteProfileByProfileId,
    PrivateProfile, PublicProfile, PublicProfileSchema, selectPrivateProfileByProfileEmail,
    selectPrivateProfileByProfileId, selectPublicProfileByProfileFullName, selectPublicProfileByProfileId,
    selectPublicProfileByUsername,
    selectPublicProfilesByProfileName, updateProfile
} from "./profile.model";
import {zodErrorResponse} from "../../utils/response.utils";
import { z } from 'zod';

import {Status} from "../../utils/interfaces/Status";


/**
 * Express controller for getting the public profiles by profileId
 * @param request from the client to the server to get all profiles by the profileId
 * @param response from the server to the client with all the public profiles or an error message
 * @return {Promise<Response<Status>>}  A promise containing the response for the client with the requested information,
 * or null if the information could not be found, set to the data field.
 */

export async function getPublicProfileByProfileIDController(request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the profileId coming from the request parameters
        const validationResult = PublicProfileSchema.pick({profileId: true}).safeParse(request.params)

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        //grab the profileId off of the validated request parameters
        const {profileId} = validationResult.data


        // grab the profile by profileId
        const data= await selectPublicProfileByProfileId(profileId)

        // Return the response to the client with the requested information
        return response.json({ status: 200, message: null, data});
    } catch (error) {
        // Handle any errors and return a preformatted response to the client
        console.error("Error fetching public profile:", error);
        return response.json({ status: 500, message: "Internal server error", data: null });
    }
}


/**
 * Express controller for getting the public profile by profileId
 * @param request from the client to the server to get all  by post profile id
 * @param response from the server to the client with all post by post profile id or an error message
 * @return {Promise<Response<Status>>}  A promise containing the response for the client with the requested information,
 * or null if the information could not be found, set to the data field.
 */

export async function getPublicProfileByProfileFullNameController(request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the profileName coming from the request parameters
        const validationResult = PublicProfileSchema.pick({profileFullName: true}).safeParse(request.params)

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // grab the profileName off of the validated request parameters
        const {profileFullName} = validationResult.data

        // grab the profile by profileName
        const data= await selectPublicProfileByProfileFullName(profileFullName)

        // return the response to the client with the requested information
        return response.json({status: 200, message: null, data})

    } catch (error: unknown) {
    console.log(error)
        // if an error occurs, return a preformatted response to the client
        return response.json({status: 500,message: "internal server error", data: null})
    }
}

/**
 * Express controller for searching for a profile by profileName
 * @param request from the client to the server to get all post by post profile id
 * @param response from the server to the client with all post by post profile id or an error message
 * @return {Promise<Response<Status>>}  A promise containing the response for the client with the requested information
 */

export async function getPublicProfilesByProfileNameController(request: Request, response: Response) : Promise<Response<Status>>  {
    try {

        // validate the profileName coming from the request parameters
        const validationResult = PublicProfileSchema.pick({profileFullName: true}).safeParse(request.params)

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // grab the profileName off of the validated request parameters
        const {profileFullName} = validationResult.data

        // grab the profile by profileName
        const data = await selectPublicProfilesByProfileName(profileFullName)

        // return the response to the client with the requested information
        return response.json({status: 200, message: null, data})

    } catch (error: unknown) {

        // if an error occurs, return a preformatted response to the client
        return response.json({status: 500,message: "internal server error", data: null})
    }
}

/**
 * express controller for updating a profile
 * @param request from the client to the server to update a profile
 * @param response from the server to the client with a status message to indicate whether the update was successful
 * @return {Promise<Response<Status>>}  A promise containing the response for the client with the requested information
 **/

export async function putUpdateProfileByProfileIdController(request: Request, response: Response): Promise<Response<Status>> {
    try {

        //validate the updated profile data coming from the request body
        const validationResultForRequestBody = PublicProfileSchema.safeParse(request.body)

        // if the validation of the body is unsuccessful, return a preformatted response to the client
        if(!validationResultForRequestBody.success) {
            return zodErrorResponse(response, validationResultForRequestBody.error)
        }

        // validate the profileId coming from the request parameters
        const validationResultForRequestParams = PublicProfileSchema.pick({profileId: true}).safeParse(request.params)

        // if the validation of the params is unsuccessful, return a preformatted response to the client
        if(!validationResultForRequestParams.success) {
            return zodErrorResponse(response, validationResultForRequestParams.error)
        }

        //grab the profileId from the session
        const profileFromSession = request.session?.profile
        const profileIdFromSession = profileFromSession?.profileId

        //grab the profileId off of the validated request parameters
        const {profileId} = validationResultForRequestParams.data

        if (profileIdFromSession !== profileId) {
            return response.json({status: 400, message: "you cannot update a profile that is not yours", data: null})
        }

        //grab the profile data off of the validated request body
        const {profileBio, profileImage, profileFullName, profileUsername} = validationResultForRequestBody.data

        //grab the profile by profileId
        const profile: PrivateProfile|null = await selectPrivateProfileByProfileId(profileId)


        //if the profile does not exist, return a preformatted response to the client
        if(profile === null) {
            return response.json({status: 400, message: "profile does not exist", data: null})
        }

        //update the profile with the new data
        profile.profileBio = profileBio
        profile.profileImage = profileImage
        profile.profileFullName = profileFullName
        profile.profileUsername = profileUsername

        //update the profile in the database
        await updateProfile(profile)

        //return a response to the client with a success message
        return response.json({status: 200, message: "profile successfully updated", data: null})


    } catch (error: unknown) {
        console.log(error)
        // if an error occurs, return a preformatted response to the client
        return response.json({status: 500,message: "internal server error", data: null})
    }
}

/**
 * Express controller for searching for a profile by profileUsername
 * @param request from the client to the server to get all posts by post profile id
 * @param response from the server to the client with all posts by post profile id or an error message
 * @return {Promise<Response<Status>>}  A promise containing the response for the client with the requested information
 */

export async function getPublicProfileByProfileUsernameController(request: Request, response: Response) : Promise<Response<Status>>  {
    try {

        // validate the profileName coming from the request parameters
        const validationResult = PublicProfileSchema.pick({profileUsername: true}).safeParse(request.params)

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // grab the profileName off of the validated request parameters
        const {profileUsername} = validationResult.data

        // grab the profile by profileName
        const data = await selectPublicProfileByUsername(profileUsername)

        // return the response to the client with the requested information
        return response.json({status: 200, message: null, data})

    } catch (error: unknown) {

        // if an error occurs, return a preformatted response to the client
        return response.json({status: 500,message: "internal server error", data: null})
    }
}

/**
 * Express controller for getting the public profile by profile Email
 * @param request from the client to the server to get all  by post profile id
 * @param response from the server to the client with all post by post profile id or an error message
 * @return {Promise<Response<Status>>}  A promise containing the response for the client with the requested information,
 * or null if the information could not be found, set to the data field.
 */

export async function getPublicProfileByProfileEmailController(request: Request, response: Response): Promise<Response<Status>> {
    try {

        // validate the profileName coming from the request parameters
        const validationResult = PublicProfileSchema.pick({profileEmail: true}).safeParse(request.params)

        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // grab the profileEmail off of the validated request parameters
        const {profileEmail} = validationResult.data

        // grab the profile by profileName
        const data= await selectPrivateProfileByProfileEmail(profileEmail)

        // return the response to the client with the requested information
        return response.json({status: 200, message: null, data})

    } catch (error: unknown) {

        // if an error occurs, return a preformatted response to the client
        return response.json({status: 500,message: "internal server error", data: null})
    }
}

/**
 * deletes a profile from the database by profile id and returns a status to the user in the response
 * @param request from the client to the server to delete a profile by profile id from the database
 * @param response from the server to the client with a status of 200 or an error message
 */
export async function deleteProfileByProfileIdController(request: Request, response: Response): Promise<Response> {
    try {
        // Validate the incoming request profileId with the uuid schema
        const validationResult = z.string().uuid({ message: 'Please provide a valid profileId' }).safeParse(request.params.profileId);

        // If the validation fails, return a response to the client
        if (!validationResult.success) {
            return response.status(400).json({
                status: 400,
                message: validationResult.error.message,
                data: null
            });
        }

        // Get the profile from the session
        const profile: PublicProfile | undefined = request.session.profile as PublicProfile;

        // Check if profile exists in session
        if (!profile) {
            return response.status(401).json({
                status: 401,
                message: 'Unauthorized',
                data: null
            });
        }

        // Get the profileId from the session
        const sessionProfileId: string = profile.profileId;

        // Get the profileId from the request parameters
        const requestProfileId: string = validationResult.data;

        // Check if the profileId from session matches the profileId from request
        if (sessionProfileId !== requestProfileId) {
            return response.status(403).json({
                status: 403,
                message: 'You are not allowed to delete this profile',
                data: null
            });
        }

        // Delete the profile from the database by profileId
        await deleteProfileByProfileId(requestProfileId);

        // Return the response with the status code 200 and a success message
        return response.status(200).json({
            status: 200,
            message: 'Profile deleted successfully',
            data: null
        });

    } catch (error) {
        // If there is an error, return the response with the status code 500 and an error message
        console.error('Error deleting profile:', error);
        return response.status(500).json({
            status: 500,
            message: 'Internal server error',
            data: null
        });
    }
}