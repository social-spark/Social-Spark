import {Router} from "express";
import {
    getPublicProfileByProfileEmailController,
    getPublicProfileByProfileIdController,
    getPublicProfileByProfileNameController,
    getPublicProfileByProfileUsernameController,
    getPublicProfilesByProfileNameController,
    putProfileController
} from "./profile.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {getAllPromptsController} from "../prompt/prompt.controller";


const basePath = '/apis/profile'

const router: Router = Router()


//Update a profile
router.route('/')
    .get(putProfileController)
    .put(isLoggedInController, putProfileController)


router.route('/:profileId')
    .get(getPublicProfileByProfileIdController)
    .put(isLoggedInController, putProfileController)

router.route('/profileNames/:profileFullName')
    .get(getPublicProfilesByProfileNameController)

router.route('/profileName/:profileFullName')
    .get(getPublicProfileByProfileNameController)

router.route('/profileUserName/:profileUserName')
    .get(getPublicProfileByProfileUsernameController)

router.route('/profileEmail/:profileEmail')
     .get(getPublicProfileByProfileEmailController)


export const profileRoute = {basePath, router}