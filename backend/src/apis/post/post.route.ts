import { Router } from 'express'
import {
    getAllPosts,
    getPageOfPostsController,
    getPostsByPostProfileIdController,
    getPostsByProfileUsernameController,
    postPostController,
    getPostByPostIdController,
    deletePostByPostIdController,
    putUpdatePostByPostIdController
} from "./post.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";

// declare a basePath for this router
const basePath = '/apis/post'

// instantiate a new router object
const router = Router()

// define post route for this router
router.route('/')
    .post(isLoggedInController, postPostController)
    .get(getAllPosts)

// router.route('/replies/postId/:postId').get(getAllReplyPostsByPostIdController)

router.route('/page/:page').get(getPageOfPostsController)

router.route('/profileUsername/:profileUsername').get(getPostsByProfileUsernameController)

router.route('/post-profile-id/:postProfileId').get(getPostsByPostProfileIdController)


router.route('/:postId')
    .get(getPostByPostIdController)
    .put(putUpdatePostByPostIdController)
    .delete(isLoggedInController, deletePostByPostIdController)

// export the router with the basePath and router object
export const postRoute = { basePath, router }