import {SignUpProfileSchema} from "./sign-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {setActivationToken, setHash} from "../../utils/auth.utils";
import {Request, Response} from "express"
import {insertProfile, PrivateProfile} from "../profile/profile.model";
import {Status} from "../../utils/interfaces/Status";

export async function signupProfileController (request: Request, response: Response): Promise<Response | undefined>
{
    try {
        // validate the new profile data coming from the request body
        const validationResult = SignUpProfileSchema.safeParse(request.body)
        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {profileUsername, profileEmail, profilePassword, profileFullName} = validationResult.data

        // hash the profilePassword
        const profileHash = await setHash(profilePassword)

        // create a new profileActivationToken
        const profileActivationToken = setActivationToken()

        const profile : PrivateProfile = {
            profileId: '',
            profileActivationToken,
            profileBio: '',
            profileDateCreated: null,
            profileEmail,
            profileFullName,
            profileImage: '',
            profileHash,
            profileUsername
        }

        // insert the new profile into the database
        await insertProfile(profile)

        //send activation email


        // create a status object to send back to the client
        const status: Status = {
            status: 200,
            message: 'Profile successfully created please check your email.',
            data: null
        }

        // send the status to the client
        return response.json(status)

        // catch any errors that occurred during the signup process
    } catch (error: any) {
        const status: Status = {
            status: 500,
            message: error.message,
            data: null
        }

        return response.json(status)
    }
}