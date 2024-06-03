import {Router} from "express";
import {getProfileByProfileId, putProfileController} from "./profile.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {asyncValidatorController} from "../../utils/controllers/asyncValidator.controller";
import {check} from "express-validator";



export const ProfileRoute: Router = Router ()
ProfileRoute.route('/')
    .post(putProfileController)

ProfileRoute.route('/:profileId')
    .get(
        asyncValidatorController([
            check ('profileId', 'please provide a valid profileId').isUUID()
        ])
        , getProfileByProfileId
    )

    .put(isLoggedInController, asyncValidatorController, putProfileController)