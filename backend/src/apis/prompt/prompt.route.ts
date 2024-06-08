import { Router } from 'express';
import {getAllPromptsByCategory, getAllPromptsController, getPromptByPostId, getPromptByPromptId} from './prompt.controller';


const router = Router();
const basePath = '/apis/prompt'

router.route('/')
    .get(getAllPromptsController);


router.route('/:promptId')
    .get(getPromptByPromptId);

router.route('/:postId')
    .get(getPromptByPostId);

router.route('/:promptCategory')
    .get(getAllPromptsByCategory);

export const promptRoute = { basePath, router };