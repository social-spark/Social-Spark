import {Router} from 'express'
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {
    deleteFollowController, getFollowsByFollowingProfileIdController,
    getFollowsByFollowedProfileIdController,
    postFollowController,
    toggleFollowController
} from "./follow.controller";

// declare a basePath for this router
const basePath = '/apis/follow'

// instantiate a new router object
const router = Router()

// define follow route for this router
router.route('/')
    .post(isLoggedInController, postFollowController)

// define follow route for this router
router.route('/toggle')
    .post(isLoggedInController, toggleFollowController)

// define follow route for this router
router.route('/followingProfileId/:followingProfileId')
    .get(getFollowsByFollowingProfileIdController)

// define follow route for this router
router.route('/followedProfileId/:followedProfileId')
    .get(getFollowsByFollowedProfileIdController)
    .delete(isLoggedInController, deleteFollowController)


// export the router with the basePath and router object
export const followRoute = {basePath, router}