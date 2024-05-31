import { z } from 'zod'

/**
 *
 *
 */

export const signInProfileSchema = z.object({
    profilePassword: z.string()
        .min(8, { message: 'please provide a valid password (min 8 characters)' })
        .max(32, { message: 'please provide a valid password (max 32 characters)' }),

    profileEmail: z.string().email({ message: 'please provide a valid email' })
        .max(256, { message: 'please provide a valid email (max 256 characters)' })
})

