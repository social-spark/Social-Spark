import {SignUpProfileSchema} from "./sign-up.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {setActivationToken, setHash} from "../../utils/auth.utils";
import {Request, Response} from "express"
import {insertProfile, PrivateProfile} from "../profile/profile.model";
import {Status} from "../../utils/interfaces/Status";
import formData from 'form-data'
import Mailgun from 'mailgun.js'

export async function signupProfileController (request: Request, response: Response): Promise<Response | undefined>
{
    try {
        // validate the new profile data coming from the request body
        const validationResult = SignUpProfileSchema.safeParse(request.body)
        // if the validation is unsuccessful, return a preformatted response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }
        const {profileEmail, profilePassword, profileFullName, profileUsername} = validationResult.data

        // hash the profilePassword
        const profileHash = await setHash(profilePassword)

        // create a new profileActivationToken
        const profileActivationToken = setActivationToken()

        const profile : PrivateProfile = {
            profileId: '',
            profileActivationToken,
            profileBio: '',
            profileEmail,
            profileFullName,
            profileImage: null,
            profileHash,
            profileDateCreated: null,
            profileUsername
        }

        // insert the new profile into the database
        await insertProfile(profile)

        //send activation email
        // create a new mailgun client with the mailgun api key
        const mailgun: Mailgun = new Mailgun(formData)
        const mailgunClient = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY as string })
        // create a basePath variable containing the scheme, host, port, and base path
        const basePath: string = `${request.protocol}://${request.hostname}:8080${request.originalUrl}/activation/${profileActivationToken}`

        // create a message for the activation email body
        const message = `<h2>Welcome to Prompt-Me.</h2>
        <p>In order to start posting you must confirm your account.</p>
        <p><a href="${basePath}">${basePath}</a></p>`

        // create a mailgun message object
        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN as string}>`,
            to: profileEmail,
            subject: 'Activate your Prompt-Me Account!',
            html: message
        }
        // send the email
        await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN as string, mailgunMessage)


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