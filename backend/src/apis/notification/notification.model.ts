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


// the shape of a notification object in the database and the API
export type Notification = z.infer<typeof NotificationSchema>

/**
 * inserts a notification into the notification table
 * @param notification object containing the notification information that is being inserted into the notification table
 * @returns {Promise<string>} a message indicating success
 **/

export async function insertNotification(notification: Notification): Promise<string> {
    // deconstruct the object
    const {notificationProfileId, notificationLikePostId, notificationLikeProfileId} = notification;

    // Check if the notification already exists in the database
    const existingNotification = await sql<Notification[]>`
        SELECT notification_like_post_id, notification_profile_id, notification_like_profile_id, notification_date, notification_read
        FROM notification
        WHERE notification_profile_id = ${notificationProfileId}
        AND notification_like_post_id = ${notificationLikePostId}
        AND notification_like_profile_id = ${notificationLikeProfileId}`;

    // If the notification already exists, send an error message
    if (existingNotification.length > 0) {
        // Handle the case where the notification already exists
        return 'Notification already exists';
    }

    // If the notification does not exist, insert it into the database
    await sql`INSERT INTO notification (notification_profile_id, notification_like_post_id, notification_date, notification_like_profile_id, notification_read)
                VALUES (${notificationProfileId}, ${notificationLikePostId}, now(), ${notificationLikeProfileId})`;

    // return a message to the user indicating success
    return 'Notification successfully posted';
}

/**
 * Selects unread notifications by profile ID.
 * @param profileId - The profile ID to select notifications for.
 * @returns A promise that resolves to an array of unread notifications.
 * @throws If an error occurs during the operation.
 */
export async function selectUnreadNotificationsByProfileID(profileId: string): Promise<Notification[]> {
    try {
        // Select unread notifications for the given profile ID
        return await sql<Notification[]>`
            SELECT notification_like_post_id, notification_profile_id, notification_like_profile_id, notification_date, notification_read
            FROM notification
            WHERE notification_profile_id = ${profileId}
            AND notification_read = false`;
    } catch (error) {
        // Handle any errors that occur during the operation
        console.error('Error selecting unread notifications by profile ID:', error);
        throw new Error('Error selecting unread notifications by profile ID');
    }
}


/**
 * Selects all notifications by profile ID.
 * @param profileId - The profile ID to select notifications for.
 * @returns A promise that resolves to an array of notifications.
 */
export async function selectNotificationsByProfileID(profileId: string): Promise<Notification[]> {
    try {
        // Select notifications for the given profile ID
        return await sql<Notification[]>`
            SELECT notification_like_post_id, notification_profile_id, notification_like_profile_id, notification_date, notification_read
            FROM notification
            WHERE notification_profile_id = ${profileId}`;

    } catch (error) {
        // Handle any errors that occur during the operation
        console.error('Error selecting notifications by profile ID:', error);
        throw new Error('Error selecting notifications by profile ID');
    }
}
