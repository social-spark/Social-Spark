import { Router } from 'express';
import {
    getAllPromptsController,
    getPromptsByPromptId
} from './prompt.controller';

const router = Router();
const basePath = '/apis/prompt'

router.route('/')
    .get(getAllPromptsController);

router.route('/:promptId')
    .get(getPromptsByPromptId);

// PromptRoute.route('/postId/:postId')
//     .get(getPromptsByPostId);

export const promptRoute = { basePath, router };