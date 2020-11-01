import { Router } from 'express';
import userRouter from './users';
import parcelRouter from './parcels';
import adminRouter from './admin';

const router = Router();

router.use(userRouter);
router.use(parcelRouter);
router.use(adminRouter);

export default router;
