import { Router } from 'express';
import {
    getAllPromptsController, getPromptsByPostId,
    getPromptsByPromptId
} from './prompt.controller';

const router = Router();
const basePath = '/apis/prompt'

router.route('/')
    .get(getAllPromptsController);

router.route('/:promptId')
    .get(getPromptsByPromptId);

router.route('/:postId')
    .get(getPromptsByPostId);

export const promptRoute = { basePath, router };