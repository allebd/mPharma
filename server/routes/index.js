import express from 'express';
import diagnosis from './diagnosis';

const router = express.Router();

router.use('/', diagnosis);

export default router;
