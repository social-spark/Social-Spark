import { z } from 'zod'
import {PrivateProfileSchema, PublicProfileSchema} from './profile.validator'
import {sql} from "../../utils/database.utils";


/**
 * Profile schema
 * The shape of the private profile that is only used by express. It must never be returned from the controller.
 * @property {string} profileId
 * @property {string} profileActivationToken
 * @property {string} profileBio
 * @property {Date} profileDateCreated
 * @property {string} profileEmail
 * @property {string} profileFullName
 * @property {string} profileImage
 * @property {string} profileHash
 * @property {string} profileUsername
 **/



export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

export type PublicProfile = z.infer<typeof PublicProfileSchema>

export async function insertProfile (profile: PrivateProfile): Promise<string> {
    const {profileActivationToken, profileEmail, profileFullName, profileImage, profileHash, profileUsername, profileBio} = profile
    await sql`INSERT INTO profile (profile_id, profile_activation_token, profile_bio, profile_date_created, profile_email, profile_full_name, profile_image, profile_hash, profile_username) 
VALUES (gen_random_uuid(), ${profileActivationToken}, ${profileBio}, now(), ${profileEmail}, ${profileFullName}, ${profileImage}, ${profileHash}, ${profileUsername})`
    return 'Profile Successfully Created'
}

export async function selectPrivateProfileByProfileActivationToken (profileActivationToken: string): Promise<PrivateProfile|null> {
    const rowList = await sql`SELECT profile_id, profile_bio, profile_date_created, profile_activation_token, profile_email, profile_hash, profile_image, profile_full_name, profile_username FROM profile 
    WHERE profile_activation_token = ${profileActivationToken}`
    const result = PrivateProfileSchema.array().max(1).parse(rowList)
    return result?.length === 1 ? result[0] : null
}

/*updates a profile in the profile table
@param profile
@ returns {Promise<string>} 'Profile successfully updated'*/

export async function updateProfile (profile: PrivateProfile): Promise<string>{
    const {profileId, profileActivationToken, profileBio, profileEmail, profileFullName, profileHash, profileImage, profileUsername} = profile
    await sql`UPDATE profile SET profile_activation_token = ${profileActivationToken}, profile_bio = ${profileBio}, profile_email = ${profileEmail}, profile_full_name = ${profileFullName}, profile_hash = ${profileHash}, profile_image = ${profileImage}, profile_username = ${profileUsername}
    WHERE profile_id = ${profileId}`
    return 'Profile successfully updated'
}

export async function selectPrivateProfileByProfileEmail (profileEmail: string): Promise<PrivateProfile | null> {
    // create a prepared statement that selects the profile by profileEmail and execute the statement
    const rowList =  await sql`SELECT profile_id, profile_bio, profile_activation_token,profile_date_created,profile_username, profile_email, profile_hash, profile_image, profile_full_name 
FROM profile WHERE profile_email = ${profileEmail}`
    //enforce that the result is an array of one profile, or null
    const result = PrivateProfileSchema.array().max(1).parse(rowList)
    // return the profile or null if no profile was found
    return result?.length === 1 ? result[0] : null
}

export async function selectPrivateProfileByProfileUsername (profileUsername: string): Promise<PrivateProfile | null> {
    const result = <PrivateProfile[]>await sql `SELECT profile_id, profile_activation_token, profile_username, profile_email, profile_hash, profile_image, profile_bio, profile_full_name 
FROM profile WHERE profile_Username = ${profileUsername}`
    return result?.length === 1 ? result[0] : null
}

export async function selectPrivateProfileByProfileId (profileId: string): Promise<PrivateProfile|null> {
    const result = <PrivateProfile[]>await sql `SELECT profile_id, profile_activation_token, profile_username, profile_image, profile_email, profile_hash 
FROM profile WHERE profile_id = ${profileId}`
    return result?.length === 1 ? result[0] : null
}

export async function selectPublicProfileByProfileId(profileId:string): Promise<PublicProfile|null> {
    const result = <PublicProfile[]>await sql`SELECT profile_id, profile_username, profile_image, profile_email from profile WHERE profile_id = ${profileId}`
    return result?.length === 1 ? result[0] : null
}


