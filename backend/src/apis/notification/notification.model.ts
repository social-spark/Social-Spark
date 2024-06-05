import {z} from 'zod'
import {sql} from "../../utils/database.utils";


/**
 * notification_like_post_id object in the database and the API
 * @property notificationLikePostId {string} foreign key of the post that the notification is associated with
 * @property notificationProfileId {string} foreign key of the profile that the notification is associated with
 * @property notificationLikeProfileId {string} foreign key of the profile that liked the post
 * @property notificationDate {Date} date the notification was created
 * @property notificationRead {boolean} whether the notification has been read
 **/

export const NotificationSchema = z.object({

    notificationLikePostId: z.string({
        required_error: 'please provide a valid notificationLikePostId',
        invalid_type_error: 'notificationLikePostId is not the correct type'
    })
        .uuid({message: 'please provide a valid uuid for notificationLikePostId'}),

    notificationProfileId: z.string({
        required_error: 'please provide a valid notificationProfileId',
        invalid_type_error: 'notificationProfileId is not the correct type'
    })
        .uuid({message: 'please provide a valid uuid for notificationProfileId'}),

    notificationLikeProfileId: z.string({
        required_error: 'please provide a valid notificationLikeProfileId',
        invalid_type_error: 'notificationLikeProfileId is not the correct type'
    })
        .uuid({message: 'please provide a valid uuid for notificationLikeProfileId'}),

    notificationDate: z.coerce.date({required_error: 'notification date is required',
        invalid_type_error: 'please provide a valid notification date'})
        .nullable(),

   notificationRead: z.boolean({required_error: 'please provide a valid notificationRead',
        invalid_type_error: 'notificationRead is not the correct type'})
        .nullable(),
})


// the shape of a tag object in the database and the API
export type Notification = z.infer<typeof NotificationSchema>

/**
 * inserts a notification into the notification table
 * @param notification object containing the notification information that is being inserted into the notification table
 * @returns {Promise<string>} a message indicating success
 **/
export async function insertNotification(notification: Notification): Promise<string> {

    // deconstruct the object
    const {notificationProfileId, notificationLikePostId, notificationDate, notificationLikeProfileId, notificationRead} = notification

    // prepare the notification to be inserted into the notification table and execute the statement
    await sql`INSERT INTO notification (notification_profile_id, notification_like_post_id, notification_date, notification_like_profile_id, notification_read)
                VALUES (${notificationProfileId}, ${notificationLikePostId}, ${notificationDate}, ${notificationLikeProfileId}, ${notificationRead})`

    // return a message to the user indicating success
    return 'notification successfully posted'
}

/**
 * inserts a notification into the notification table
 * @param notificationLikePostId the post id to search for in the notification table
 * @param notificationProfileId the profile id to search for in the notification table
 * @returns {Promise<string>} returns the posts that were notified or a message indicating no posts were notified
 **/

export async function selectNotificationsByLikePostId(notificationLikePostId: string): Promise<Notification[]> {
    //prepare a statement to select the notifications by notificationsLikePostId and execute the statement
    const rowList = await sql`SELECT notification_profile_id, notification_like_post_id, notification_like_profile_id
FROM notification WHERE notification_profile_id = ${notificationProfileId}
 AND notification_like_post_id = ${notificationLikePostId}`

    // enforce that the result is an array of notifications and return the array
    return NotificationSchema.array().parse(rowList)
}

/**
 * selects tags by tagKeywordId from the tag table
 * @param tagKeywordId the keyword id to search for in the tag table
 * @returns {Promise<Tag[]>} an array of tags or an empty array
 **/

export async function selectTagsByTagKeywordId(tagKeywordId: string): Promise<Tag[]> {

    //prepare a statement to select the tags by tagKeywordId and execute the statement
    const rowList = await sql`SELECT tag_keyword_id, tag_thread_id FROM tag WHERE tag_keyword_id = ${tagKeywordId}`

    // enforce that the result is an array of tags and return the array
    return TagSchema.array().parse(rowList)
}


/**
 * selects a  tag by tagKeywordId and tagThreadId from the tag table
 * @param tagKeywordId the keyword id to search for in the tag table
 * @param tagThreadId the thread id to search for in the tag table
 * @returns {Promise<Tag | null>} a tag or null
 **/
export async function selectTagByTagKeywordIdAndTagThreadId(tagKeywordId: string, tagThreadId: string): Promise<Tag | null> {
    // prepare a statement to select the tag by tagKeywordId and tagThreadId and execute the statement

    const rowList = await sql`SELECT tag_keyword_id, tag_thread_id FROM tag WHERE tag_keyword_id = ${tagKeywordId} AND tag_thread_id = ${tagThreadId}`

    // enforce that the result is an array of one tag, or null
    const result = TagSchema.array().max(1).parse(rowList)

    // return the tag or null if no tag was found
    return result?.length === 1 ? result[0] : null
}


/**
 * deletes a tag by tagKeywordId and tagThreadId from the tag table
 * @param tagKeywordId the keyword id to search for in the tag table
 * @param tagThreadId the thread id to search for in the tag table
 * @returns {Promise<string>} a message indicating success
 *
 */

export async function deleteTagByTagKeywordIdAndTagThreadId(tagKeywordId: string, tagThreadId: string): Promise<string> {

    // prepare a statement to delete the tag by tagKeywordId and tagThreadId and execute the statement
    await sql`DELETE FROM tag WHERE tag_keyword_id = ${tagKeywordId} AND tag_thread_id = ${tagThreadId}`

    // return a message to the user indicating success
    return 'Tag successfully deleted'
}