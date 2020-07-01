const router = require("express").Router()
import Parcel from "../controllers/parcels";
import Users from '../controllers/users';
import auth from '../middleware/auth'

router.post('/parcels', auth.verifyToken, Parcel.create);
router.get('/parcels',auth.verifyToken, Parcel.getUserParcel);
router.get('/parcels/:id', auth.verifyToken, Parcel.getOneParcel);
router.put('/parcels/:id', auth.verifyToken, Parcel.updateParcel);
router.delete('/parcels/:id/cancel',auth.verifyToken, Parcel.cancelParcel);


router.post('/signup', Users.create);
router.post('/signin', Users.login);

export default router;