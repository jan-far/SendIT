const router = require("express").Router(config.accessLevels.user)
import Parcel from "../controllers/parcels";
import Right from '../controllers/users';
import auth from '../middleware/auth';
import config from '../config/config';


router.post('/parcels', auth.userRole,  Parcel.create );
router.get('/parcels',auth.userRole, Parcel.getUserParcel);
router.get('/parcels/:id', auth.userRole, Parcel.getOneParcel);
router.put('/parcels/:id', auth.userRole, Parcel.updateParcel);
router.delete('/parcels/:id/cancel',auth.userRole, Parcel.cancelParcel);

router.post('/auth/signup', Right.User.create);
router.post('/auth/signin', Right.User.login);

router.post('/admin/signup', Right.Admin.create);

export default router;