import { Router } from 'express';
import userRouter from './users';
import parcelRouter from './parcels';

const router = Router();

router.use(userRouter);
router.use(parcelRouter);

export default router;
