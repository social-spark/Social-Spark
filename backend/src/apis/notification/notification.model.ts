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

// Define the function to get notifications by profile ID
export async function getNotificationsByProfileID(profileId: string): Promise<Notification[]> {
    // Write the SQL query to fetch notifications by profile ID and filter those that are not read
    const notifications = await sql<Notification[]>`
        SELECT notification_profile_id, notification_like_post_id, notification_like_profile_id, notification_date, notification_read
        FROM notification
        WHERE notification_profile_id = ${profileId} AND notification_read = false`;

    // Return the fetched notifications
    return notifications;
}