const router = require("express").Router()
import Parcel from "../controller/parcelController";
import Users from '../controller/userController';
import auth from '../middleware/auth'

router.post('/parcels', auth.verifyToken, Parcel.create);
router.get('/parcels', Parcel.getAll);
router.get('/parcels/:id', Parcel.getOne);
router.put('/parcels/:id', Parcel.update);
router.delete('/parcels/:id/cancel',auth.verifyToken, Parcel.delete);


router.post('/signup', Users.create);
router.post('/signin',auth.verifyToken, Users.login);


export default router;