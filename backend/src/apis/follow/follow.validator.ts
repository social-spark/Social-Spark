import { z } from 'zod'

/**
 * The shape of a follow object in the database and the API
 * @property followingProfileId {string} foreign key of the profile that is doing the following
 * @property followedProfileId {string} foreign key of the profile that is being followed
 * @property followDatetime {Date} the date and time the follow was created
 */
export const FollowSchema = z.object({
    followingProfileId: z.string({required_error: 'please provide a valid followingProfileId'}).uuid({message: 'please provide a valid uuid for followingProfileId'}),
    followedProfileId: z.string({required_error: 'please provide a valid followedProfileId'}).uuid({message: 'please provide a valid uuid for followedProfileId'}),
    followDateCreated: z.date({required_error: 'please provide a valid followDateCreated or null'}).nullable(),
})