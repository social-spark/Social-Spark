import { Router } from 'express';
import {
    getAllPromptsByCategory,
    getAllPromptsByDate,
    getAllPromptsController,
    getPromptByPromptId
} from './prompt.controller';


const router = Router();
const basePath = '/apis/prompt'

router.route('/')
    .get(getAllPromptsController);


router.route('/:promptId')
    .get(getPromptByPromptId);


router.route('/promptCategory/:promptCategory')
    .get(getAllPromptsByCategory);

router.route('/promptDate/:promptDate').get(getAllPromptsByDate);

export const promptRoute = { basePath, router };