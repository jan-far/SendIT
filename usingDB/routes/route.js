const router = require("express").Router(config.accessLevels.user)
import Parcel from "../controllers/parcels";
import Users from '../controllers/users';
import auth from '../middleware/auth';
import config from '../config/config';


router.post('/parcels', auth.userRole,  Parcel.create );
router.get('/parcels',auth.userRole, Parcel.getUserParcel);
router.get('/parcels/:id', auth.userRole, Parcel.getOneParcel);
router.put('/parcels/:id', auth.userRole, Parcel.updateParcel);
router.delete('/parcels/:id/cancel',auth.userRole, Parcel.cancelParcel);


router.post('/signup', Users.create);
router.post('/signin', Users.login);

export default router;