import {Router} from "express";
import {
    getPublicProfileByProfileEmailController,
    getPublicProfileByProfileFullNameController, getPublicProfileByProfileIDController,
    getPublicProfileByProfileUsernameController, putUpdateProfileByProfileIdController
} from "./profile.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/profile'

const router: Router = Router()


//Update a profile
router.route('/:profileId')
    .get(getPublicProfileByProfileIDController)
    .put(isLoggedInController, putUpdateProfileByProfileIdController)



router.route('/profile')

router.route('/full-name/:profileFullName')
    .get(getPublicProfileByProfileFullNameController)

// router.route('/profileName/:profileFullName')
    // .get(getPublicProfileByProfileNameController)

router.route('/profileUserName/:profileUserName')
    .get(getPublicProfileByProfileUsernameController)

router.route('/profileEmail/:profileEmail')
     .get(getPublicProfileByProfileEmailController)


export const profileRoute = {basePath, router}