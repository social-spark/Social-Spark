import { z } from 'zod'
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
 * @property {string} profileImageUrl
 * @property {string} profileHash
 * @property {string} profileUsername
 **/

export const PrivateProfileSchema = z.object({
    profileId: z.string({
        required_error: 'profileId is required',
        invalid_type_error: 'Please provide a valid profileId'
    })
        .uuid({ message: 'please provide a valid profileId' }),
    profileActivationToken: z.string({
        required_error: 'profileActivationToken is required',
        invalid_type_error: 'please provide a valid profileActivationToken'
    })
        .length(32, { message: 'profile activation token is to long' })
        .nullable(),
    profileBio: z.string({
        required_error: 'profile about is a required field.',
        invalid_type_error: 'please provide a valid profile about'
    })
        .max(200, { message: 'profile about length is to long' })
        .nullable(),
    profileDateCreated:
        z.coerce.date({required_error: 'please provide a valid profileDateCreated or null',
            invalid_type_error: "profile date time is not a valid date"})
            .nullable(),
    profileEmail: z.string({
        required_error: 'profileEmail is required',
        invalid_type_error: ' please provide a valid profileEmail'
    })
        .email({ message: 'please provide a valid email' })
        .max(80, { message: 'profileEmail is to long' }),
    profileFullName: z.string({
        required_error: 'profileFullName is required',
        invalid_type_error: 'please provide a valid profileFullName'})
        .trim()
        .min(1, { message: 'please provide a valid profile name (min 1 characters)' })
        .max(32, { message: 'please provide a valid profile name (max 32 characters)' }),
    profileImage: z.string({
        required_error: 'profileImage is required',
        invalid_type_error: 'please provide a valid profileImageUrl'
    })
        .trim()
        .url({ message: 'please provide a valid profile image url' })
        .max(255, { message: 'profile image url is to long' })
        .nullable(),
    profileHash: z.string({
        required_error: 'profileHash is required',
        invalid_type_error: 'please provide a valid profileHash'
    })
        .length(97, { message: 'profile hash must be 97 characters' }),
    profileUsername: z.string({
        required_error: 'profileUsername is required',
        invalid_type_error: 'please provide a valid profileUsername'
    })
        .trim()
        .min(4, { message: 'please provide a valid profileUsername (min 4 characters)' })
        .max(15, { message: 'please provide a valid profileUsername (max 32 characters)' }),
    }
)

export type PrivateProfile = z.infer<typeof PrivateProfileSchema>

export async function insertProfile (profile: PrivateProfile): Promise<string> {

    //
    const {profileActivationToken,profileBio, profileDateCreated, profileEmail, profileFullName, profileImage, profileHash, profileUsername} = profile
    await sql`INSERT INTO profile (profile_id, profile_activation_token, profile_bio, profile_date_created, profile_email, profile_full_name, profile_image, profile_hash, profile_username) VALUES (gen_random_uuid(), ${profileActivationToken}, ${profileBio}, now(), ${profileEmail}, ${profileFullName}, ${profileImage}, ${profileHash}, ${profileUsername})`
    return 'Profile Successfully Created'
}

