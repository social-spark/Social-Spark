import {Router} from "express";
import {
    getPublicProfileByProfileEmailController,
    getPublicProfileByProfileIdController,
    getPublicProfileByProfileNameController,
    getPublicProfileByProfileUsernameController,
    getPublicProfilesByProfileNameController, putUpdateProfileByProfileIdController
} from "./profile.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {getAllPromptsController} from "../prompt/prompt.controller";


const basePath = '/apis/profile'

const router: Router = Router()


//Update a profile
router.route('/')
    .get(putUpdateProfileByProfileIdController)
    .put(isLoggedInController, putUpdateProfileByProfileIdController)


router.route('/:profileId')
    .get(getPublicProfileByProfileIdController)


router.route('/profileNames/:profileFullName')
    .get(getPublicProfilesByProfileNameController)

router.route('/profileName/:profileFullName')
    .get(getPublicProfileByProfileNameController)

router.route('/profileUserName/:profileUserName')
    .get(getPublicProfileByProfileUsernameController)

router.route('/profileEmail/:profileEmail')
     .get(getPublicProfileByProfileEmailController)


export const profileRoute = {basePath, router}