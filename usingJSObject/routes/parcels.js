import { Router } from 'express';
import Parcel from '../controller/parcelController';
import auth from '../middleware/auth';

const router = Router();

router.post('/parcels', auth.verifyToken, Parcel.create);
router.get('/parcels', auth.verifyToken, Parcel.getAll);
router.get('/parcels/:id', auth.verifyToken, Parcel.getOne);
router.get('/users/:id/parcels', auth.verifyToken, Parcel.get_for_a_user);
router.put('/parcels/:id', auth.verifyToken, Parcel.update);
router.put('/parcels/:id/cancel', auth.verifyToken, Parcel.delete);

export default router;
