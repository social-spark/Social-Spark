import {Request, Response} from "express";
import {insertNotification, selectNotificationsByProfileID, selectUnreadNotificationsByProfileID,} from './notification.model';
import {Notification} from "./notification.model";

/**
 * Handles the creation of a new notification.
 * @param request - The request object containing notification data in the body.
 * @param response - The response object used to send a response to the client.
 * @returns {Promise<Response<Status>>} A Promise indicating the completion of the function.
 */
export async function createNotification(request: Request, response: Response): Promise<Response> {
    try {
        // Extract notification data from request body
        const { notificationProfileId, notificationLikePostId, notificationDate, notificationLikeProfileId, notificationRead } = request.body;

        // Perform validation here
        if (!notificationProfileId || !notificationLikePostId || !notificationDate || !notificationLikeProfileId || notificationRead === undefined) {
            // If any required field is missing, return a 400 Bad Request response
            return response.status(400).json({ status: 400, message: 'Missing required fields', data: null });
        }
        // Create notification object
        const notification = {
            notificationProfileId,
            notificationLikePostId,
            notificationDate,
            notificationLikeProfileId,
            notificationRead
        };

        // Call insertNotification function from model to insert notification into database
        const result = await insertNotification(notification);

        // Return the response to the client with the requested information
        return response.json({ status: 200, message: null, data: result });

    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error creating notification:', error);

        // Return a preformatted response to the client
        return response.status(500).json({ status: 500, message: 'Internal server error', data: null });
    }
}


/**
 * Controller function to get unread notifications by profile ID.
 *
 * @param profileId - The profile ID to get notifications for.
 * @returns A promise that resolves to an array of unread notifications.
 * @throws If an error occurs during the operation.
 */
export async function getUnreadNotificationsByProfileID(profileId: string): Promise<Notification[]> {
    try {
        // Call the selectUnreadNotificationsByProfileID function to get unread notifications
        return await selectUnreadNotificationsByProfileID(profileId); // Return the unread notifications
    } catch (error) {
        // Handle any errors that occur during the operation
        console.error('Error getting unread notifications by profile ID:', error);
        throw new Error('Error getting unread notifications by profile ID');
    }
}

/**
 * Controller function to get all notifications by profile ID.
 * @param profileId - The profile ID to get notifications for.
 * @returns A promise that resolves to an array of notifications.
 */
export async function getAllNotificationsByProfileID(profileId: string): Promise<Notification[]> {
    try {
        // Call the selectNotificationsByProfileID function to get notifications
            return await selectNotificationsByProfileID(profileId);

    } catch (error) {
        // Handle any errors that occur during the operation
        console.error('Error getting notifications by profile ID:', error);
        throw new Error('Error getting notifications by profile ID');
    }
}
