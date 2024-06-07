import { Router } from 'express'
import {
    getAllPosts,
    getPageOfPostsController,
    getPostsByPostProfileIdController,
    getPostsByProfileUsernameController,
<<<<<<< HEAD
    postPostController, getPostByPostIdController, deletePostByPostIdController, UpdatePostByPostIdController
=======
    postPostController, getPostByPostIdController
>>>>>>> 00ea6e73f0f0f7c860047e040dbf306b3e1bc9f5
} from "./post.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";

// declare a basePath for this router
const basePath = '/apis/post'

// instantiate a new router object
const router = Router()

// define thread route for this router
router.route('/')
    .post(isLoggedInController, postPostController)
    .get(getAllPosts)

// router.route('/replies/postId/:postId').get(getAllReplyPostsByPostIdController)

router.route('/page/:page').get(getPageOfPostsController)

router.route('/profileUsername/:profileUsername').get(getPostsByProfileUsernameController)

router.route('/postProfileId/:postProfileId').get(getPostsByPostProfileIdController)

<<<<<<< HEAD
=======
function deletePostByPostIdController() {

}
>>>>>>> 00ea6e73f0f0f7c860047e040dbf306b3e1bc9f5

router.route('/:postId')
    .get(getPostByPostIdController)
    .delete(isLoggedInController, deletePostByPostIdController, UpdatePostByPostIdController)

// export the router with the basePath and router object
export const postRoute = { basePath, router }