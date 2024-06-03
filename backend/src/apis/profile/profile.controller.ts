import {Request, Response} from 'express'
import {PrivateProfile, selectPrivateProfileByProfileId, updateProfile, selectPublicProfileByProfileId} from "./profile.model"
import {Status} from "../../utils/interfaces/Status";

export async function putProfileController (request: Request, response: Response): Promise<Response> {
    try {
        const {profileId} = request.params
        const {profileEmail, profileImage, profileUsername} = request.body
        const profile = request.session.profile as PrivateProfile
        const profileIdFromSession = profile.profileId as string

        const performUpdate = async (PrivateProfile: PrivateProfile): Promise<Response> => {
            const previousProfile: PrivateProfile = await selectPrivateProfileByProfileId(PrivateProfile.profileId as string) as PrivateProfile
            const newProfile: PrivateProfile = {...previousProfile, ...PrivateProfile}
            await updateProfile(newProfile)
            return response.json({status: 200, data: null, message: 'Successfully updated'})

        }
        const updateFailed = (message: string): Response => {
            return response.json({status: 400, data: null, message})
        }

        return profileId === profileIdFromSession
            ? await performUpdate({profileId, profileImage, profileUsername, profileFullName: '', profileEmail: profileEmail, profileHash: '', profileBio: '', profileActivationToken: '', profileDateCreated: null})
            : updateFailed('You are not allowed to perform this action.')

    } catch (error: any) {
        return response.json({status: 400, data: null, message: error.message})
    }
}

export async function getProfileByProfileId(request: Request, response: Response): Promise<Response>{
    try{
        const {profileId} = request.params
        const postgreSqlResult = await selectPublicProfileByProfileId(profileId)
        const data = postgreSqlResult ?? null
        const status: Status = {status: 200, data, message: null}
        return response.json(status)
    } catch (error: any) {
        return (response.json({status: 400, data: null, message: error.message}))
    }
}