import { z } from 'zod'

export const ProfileSchema = z.object({
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

    profileEmail: z.string({
        required_error: 'profileEmail is required',
        invalid_type_error: ' please provide a valid profileEmail'
    })
        .email({ message: 'please provide a valid email' })
        .max(128, { message: 'profileEmail is to long' }),
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

export type Profile = z.infer<typeof ProfileSchema>

export async function fetchProfileByProfileId(profileId: string): Promise<Profile> {
    const { data } = await fetch(`${process.env.PUBLIC_API_URL}/apis/profile/${profileId}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
        },

    }).then((response: Response) => {
        if (!response.ok) {
            throw new Error('Error fetching profile')
        } else {
            return response.json()
        }

    })

    return ProfileSchema.parse(data)

}