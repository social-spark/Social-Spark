import { z } from 'zod'
import { sql } from '../../utils/database.utils'

/**
 * The shape of the private profile that is only used by express. it must never be returned to the controller.
 * @property profileId {string} the primary key
 * @property profileBio {string} the profile's about
 * @property profileActivationToken {string|null} the profile's activation token
 * @property profileEmail {string|null} the profile's email
 * @property profileHash {string} the profile's hash
 * @property profileImage {string|null} the profile's image url
 * @property profileFullName {string} the profile's name
 * @property profileUsername {string} the profile's username
 * @property profileDateCreated {string} the profile's date created
 **/
export const PrivateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide a valid profileId'
    })
        .uuid({ message: 'please provide a valid profileId' }),
    profileBio: z.string({
        required_error: 'profile about is a required field.',
        invalid_type_error: 'please provide a valid profile about'
    })
        .max(512, { message: 'profile about length is to long' })
        .nullable(),
    profileActivationToken: z.string({
        required_error: 'profileActivationToken is required',
        invalid_type_error: 'please provide a valid profileActivationToken'
    })
        .length(32, { message: 'profile activation token is to long' })
        .nullable(),
    profileEmail: z.string({
        required_error: 'profileEmail is required',
        invalid_type_error: ' please provide a valid profileEmail'
    })
        .email({ message: 'please provide a valid email' })
        .max(128, { message: 'profileEmail is to long' }),
    profileHash: z.string({
        required_error: 'profileHash is required',
        invalid_type_error: 'please provide a valid profileHash'
    })
        .length(97, { message: 'profile hash must be 97 characters' }),
    profileImage: z.string({
        required_error: 'profileImage is required',
        invalid_type_error: 'please provide a valid profileImageUrl'
    })
        .trim()
        .url({ message: 'please provide a valid profile image url' })
        .max(255, { message: 'profile image url is to long' })
        .nullable(),
    profileFullName: z.string({required_error: 'profile fullname is required',
        invalid_type_error: 'please provide a valid profile name'})
        .trim()
        .min(1, { message: 'please provide a valid profile name (min 1 characters)' })
        .max(32, { message: 'please provide a valid profile name (max 32 characters)' }),


    profileUsername: z.string({required_error: 'profile username is required',
        invalid_type_error: 'please provide a valid username'})
        .trim()
        .min(1, { message: 'please provide a valid profile name (min 1 characters)' })
        .max(32, { message: 'please provide a valid profile name (max 32 characters)' }),

    profileDateCreated: z.coerce.date({required_error: 'profile date created is required',
        invalid_type_error: 'please provide a valid date created'})
        .nullable()
})

export type PrivateProfile = z.infer<typeof PrivateProfileSchema>


/**
 * The shape of the public profile that can shared with Next.js
 * @property profileId {string} the primary key
 * @property profileBio {string} the profile's about
 * @property profileEmail {string|null} the profile's email
 * @property profileImage {string|null} the profile's image url
 * @property profileFullName {string} the profile's name
 **/

export const PublicProfileSchema = PrivateProfileSchema.omit({profileHash: true, profileActivationToken: true})
export type PublicProfile = z.infer<typeof PublicProfileSchema>

/**
 * updates a profile in the profile table
 * @param profile
 * @returns {Promise<string>} 'Profile successfully updated'
 */
export async function updateProfile (profile: PrivateProfile): Promise<string> {
    const { profileId, profileBio, profileActivationToken, profileEmail, profileHash, profileImage, profileFullName, profileUsername, profileDateCreated} = profile
    await sql`UPDATE profile SET profile_bio = ${profileBio}, profile_activation_token = ${profileActivationToken}, profile_email = ${profileEmail}, profile_hash = ${profileHash}, profile_image = ${profileImage}, profile_full_name = ${profileFullName}, profile_username = ${profileUsername} WHERE profile_id = ${profileId}`
    return 'Profile successfully updated'
}

/**
 * Selects the privateProfile from the profile table by profileEmail
 * @param profileEmail  the profile's email to search for in the profile table
 * @returns Profile or null if no profile was found
 */
export async function selectPrivateProfileByProfileEmail (profileEmail: string): Promise<PrivateProfile | null> {

    // create a prepared statement that selects the profile by profileEmail and execute the statement
    const rowList =  await sql`SELECT profile_id, profile_bio, profile_activation_token, profile_email, profile_hash, profile_image, profile_full_name, profile_date_created, profile_username FROM profile WHERE profile_email = ${profileEmail}`

    //enforce that the result is an array of one profile, or null
    const result = PrivateProfileSchema.array().max(1).parse(rowList)

    // return the profile or null if no profile was found
    return result?.length === 1 ? result[0] : null
}

/**
 * selects all the publicProfile from the profile table by profileId
 * @param profileId the profile's id to search for in the profile table
 * @returns Profile or null if no profile was found by that profileId
 **/
export async function selectPublicProfileByProfileId(profileId:string): Promise<PublicProfile | null> {

    // create a prepared statement that selects the profile by profileId and execute the statement
    const rowList = await sql`SELECT profile_id, profile_bio, profile_image, profile_full_name, profile_date_created, profile_username, profile_email FROM profile WHERE profile_id = ${profileId}`

    // enforce that the result is an array of one profile, or null
    const result = PublicProfileSchema.array().max(1).parse(rowList)

    // return the profile or null if no profile was found
    return  result?.length === 1 ? result[0] : null
}

/**
 * selects the privateProfile from the profile table by profileId
 * @param profileId the profile's id to search for in the profile table
 * @returns PrivateProfile or null if no profile was found
 */
export async function selectPrivateProfileByProfileId(profileId: string): Promise<PrivateProfile | null> {

    // create a prepared statement that selects the profile by profileId and execute the statement
    const rowList = await sql`SELECT profile_id, profile_bio, profile_activation_token, profile_email, profile_hash, profile_image, profile_full_name, profile_date_created, profile_username FROM profile WHERE profile_id = ${profileId}`

// enforce that the result is an array of one profile, or null
    const result = PrivateProfileSchema.array().max(1).parse(rowList)

    // return the profile or null if no profile was found
    return result?.length === 1 ? result[0] : null
}

/**
 * selects the publicProfile from the profile table by profileName
 * @param profileFullName the profile's name to search for in the profile table
 * @returns {PublicProfile | null} if no profile was found
 */
export async function selectPublicProfileByProfileFullName(profileFullName: string): Promise<PublicProfile | null> {

    // create a prepared statement that selects the profile by profileName and execute the statement
    const rowList = await sql`SELECT profile_id, profile_bio, profile_image, profile_full_name, profile_username, profile_email, profile_date_created FROM profile WHERE profile_full_name = ${profileFullName}`

    // enforce that the result is an array of one profile, or null
    const result = PublicProfileSchema.array().max(1).parse(rowList)

    // return the profile or null if no profile was found
    return result?.length === 1 ? result[0] : null
}

/**
 * selects a list of profiles from the profile table by profileName
 * @param profileName the profile's name to search for in the profile table
 * @returns an array of profiles
 **/

export async function selectPublicProfilesByProfileName(profileName: string): Promise<PublicProfile[]> {

    // format profileName to include wildcards
    const profileNameWithWildcards = `%${profileName}%`

    // create a prepared statement that selects profiles by profileName and execute the statement
    const rowList = await sql`SELECT profile_id, profile_bio, profile_image, profile_full_name, profile_username FROM profile WHERE profile_full_name LIKE ${profileNameWithWildcards}`

    return PublicProfileSchema.array().parse(rowList)
}


/**
 * Inserts a new profile into the profile table
 * @param profile the profile to insert
 * @returns "profile successfully created"
 */
export async function insertProfile (profile: PrivateProfile): Promise<string> {

    //
    const {profileActivationToken,profileBio, profileEmail, profileFullName, profileImage, profileHash, profileUsername} = profile
    await sql`INSERT INTO profile (profile_id, profile_activation_token, profile_bio, profile_date_created, profile_email, profile_full_name, profile_image, profile_hash, profile_username)
              VALUES (gen_random_uuid(), ${profileActivationToken}, ${profileBio}, now(), ${profileEmail}, ${profileFullName}, ${profileImage}, ${profileHash}, ${profileUsername})`
    return 'Profile Successfully Created'
}

/**
 * Selects a profile from the profile table by profileActivationToken
 * @param profileActivationToken the profile's activation token to search for in the profile table
 * @returns Profile or null if no profile was found
 */
export async function selectPrivateProfileByProfileActivationToken (profileActivationToken: string): Promise<PrivateProfile|null> {

    const rowList = await sql`SELECT profile_id, profile_bio, profile_activation_token, profile_email, profile_hash, profile_image, profile_full_name, profile_username, profile_date_created FROM profile WHERE profile_activation_token = ${profileActivationToken}`
    const result = PrivateProfileSchema.array().max(1).parse(rowList)
    return result?.length === 1 ? result[0] : null
}

/**
 * selects profile from the profile table by profileUsername
 * @param profileUsername the profile's name to search for in the profile table
 * @returns an array of profiles
 **/

export async function selectPublicProfileByUsername(profileUsername: string): Promise<PublicProfile[]> {

    // format profileUsername to include wildcards
    const profileUsernameWithWildcards = `%${profileUsername}%`

    // create a prepared statement that selects profiles by profileName and execute the statement
    const rowList = await sql`SELECT profile_id, profile_bio, profile_image, profile_full_name, profile_username FROM profile WHERE profile.profile_username LIKE ${profileUsernameWithWildcards}`

    return PublicProfileSchema.array().parse(rowList)
}

/**
 * deletes the profile from the profile table in the database by profileId and returns a message that says 'profile successfully deleted'
 * @return 'Profile successfully deleted'
 */
export async function deleteProfileByProfileId (profileId: string): Promise<string> {
    //delete the profile from the profile table in the database by profileId
    await sql`DELETE
              FROM profile
              WHERE profile_id = ${profileId}`
    return 'Profile successfully deleted'
}
