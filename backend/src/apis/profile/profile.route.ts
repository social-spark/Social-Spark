import {Router} from "express";
import {
    getPublicProfileByProfileIdController, getPublicProfileByProfileNameController,
    getPublicProfilesByProfileNameController,
    putProfileController
} from "./profile.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";


const basePath = '/apis/profile'

const router: Router = Router()

router.route('/:profileId')
    .get(getPublicProfileByProfileIdController)
    .put(isLoggedInController, putProfileController)

router.route('/profileNames/:profileFullName')
    .get(getPublicProfilesByProfileNameController)

router.route('/profileName/:profileFullName')
    .get(getPublicProfileByProfileNameController)

export const profileRoute = {basePath, router}