import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {
    createNotification,
    getAllNotificationsByProfileID,
    getUnreadNotificationsByProfileID
} from "./notification.controller";
import {Router} from "express";


const basePath = '/apis/tag'

// instantiate a new router object
const router = Router()

router.route('/:notification')
    .get(createNotification)
    .put(isLoggedInController)

router.route('/:notificationByProfileId')
    .get(getUnreadNotificationsByProfileID)
    .put(isLoggedInController)

router.route('/:notificationByProfileId')
    .get(getAllNotificationsByProfileID)
    .put(isLoggedInController)

// export the router with the basePath and router object
export const NotificationRoute = {basePath, router}