import { z } from 'zod'
import {PrivateProfileSchema} from "../profile/profile.model";


export const SignUpProfileSchema = PrivateProfileSchema
    .omit({profileId: true, profileDateCreated: true, profileActivationToken: true, profileHash: true, profileBio: true, profileImage: true})
    .extend({
        profilePasswordConfirm: z.string()
            .min(8, { message: 'please provide a valid password (min 8 characters)' })
            .max(32, { message: 'please provide a valid password (max 32 characters)' }),
        profilePassword: z.string()
            .min(8, { message: 'please provide a valid password (min 8 characters)' })
            .max(32, { message: 'please provide a valid password (max 32 characters)' })
    })
    .refine(data => data.profilePassword === data.profilePasswordConfirm, {
        message: 'passwords do not match'
    })