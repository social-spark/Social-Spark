import { z } from 'zod'

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
        .max(40, { message: 'please provide a valid profile name (max 40 characters)' }),
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
        .max(32, { message: 'please provide a valid profileUsername (max 32 characters)' }),
    }
)
export const PublicProfileSchema = PrivateProfileSchema.omit({profileHash: true, profileActivationToken: true, profileEmail: true})