import {z} from 'zod'
import {FollowSchema} from "./follow.validator";
import {sql} from "../../utils/database.utils";

// The shape of a follow object
export type Follow = z.infer<typeof FollowSchema>

/**
 * inserts a follow into the follow table and returns a message to the user indicating success
 * @param follow to be inserted into the follow table
 * @returns 'Follow successfully posted'
 */
export async function insertFollow(follow: Follow): Promise<string> {

    // deconstruct the follow object
    const {followingProfileId, followedProfileId} = follow

    // insert the follow into the follow table
    await sql`INSERT INTO follow (following_profile_id, followed_profile_id, follow_date_created)
              VALUES (${followingProfileId}, ${followedProfileId}, NOW())`

    // return a message to the user indicating success
    return 'Follow successfully posted'
}

/**
 * selects a follow from the follow table by followId and returns the follow
 * @param follow to be selected by followId
 * @returns the follow that was selected
 */
export async function selectFollowByFollowedId(follow: Follow): Promise<Follow | null> {

    // deconstruct the follow object
    const {followingProfileId, followedProfileId} = follow

    // select the follow from the follow table by followId
    const rowList = <Follow[]>await sql`SELECT following_profile_id, followed_profile_id, follow_date_created
                                        FROM follow
                                        WHERE following_profile_id = ${followingProfileId}
                                          AND followed_profile_id = ${followedProfileId}`

    // parse the result into an array of follows
    const result = FollowSchema.array().max(1).parse(rowList)

    // return the follow that was selected
    return result.length === 0 ? null : result[0]
}

/**
 * deletes a follow from the follow table and returns a message to the user indicating success
 * @param follow to be deleted from the follow table
 * @returns 'Follow successfully deleted'
 */
export async function deleteFollow(follow: Follow): Promise<string> {

    // deconstruct the follow object
    const {followingProfileId, followedProfileId} = follow

    // delete the follow from the follow table
    await sql`DELETE
              FROM follow
              WHERE following_profile_id = ${followingProfileId}
                AND followed_profile_id = ${followedProfileId}`

    // return a message to the user indicating success
    return 'Follow successfully deleted'
}

/**
 * selects a list of follows for the profiles that the profile is following
 * @param followingProfileId the profile id of the profile that is doing the following
 * @returns an array of follows (containing profileIds that the profile is following)
 */
export async function selectFollowsByFollowingProfileId(followingProfileId: string): Promise<Follow[]> {

    // selects a list of follows for the profiles that the profile is following
    const rowList = <Follow[]>await sql`SELECT following_profile_id, followed_profile_id, follow_date_created
                                        FROM follow
                                        WHERE following_profile_id = ${followingProfileId}`

    // parse the result into an array of follows and return it
    return FollowSchema.array().parse(rowList)
}

/**
 * selects a list of follows for the profiles that are following this profile (followedProfileId)
 * @param followedProfileId the profile id of the profile that is being followed
 * @returns an array of follows (containing profileIds that are following this profile - followedProfileId)
 */
export async function selectFollowsByFollowedProfileId(followedProfileId: string): Promise<Follow[]> {

    // selects a list of follows for the profiles that are following this profile (followedProfileId)
    const rowList = <Follow[]>await sql`SELECT following_profile_id, followed_profile_id, follow_date_created
                                            FROM follow
                                            WHERE followed_profile_id = ${followedProfileId}`

    // parse the result into an array of follows and return it
    return FollowSchema.array().parse(rowList)
}