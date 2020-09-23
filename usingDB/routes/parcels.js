import { Router } from 'express';
import Parcel from '../controllers/parcels';
import {auth, validator} from '../middleware';

const router = Router();

// Create a parcel delivery order
router.post('/parcels', validator.parcelValidator, auth.userRole, Parcel.create);

// Fetch all parcel delivery orders
router.get('/parcels', auth.userRole, Parcel.getUserParcel);

// Fetch a specific parcel delivery order
router.get('/parcels/:id', auth.userRole, Parcel.getOneParcel);

// Update a parcel destination delivery order
router.put('/parcels/:id/destination', auth.userRole, Parcel.updateParcel);

// Cancel the specific parcel delivery order
router.delete('/parcels/:id/cancel', auth.userRole, Parcel.cancelParcel);

// Change the status of a specific parcel delivery order
router.put('/parcels/:id/status', auth.adminRole, Parcel.updateParcelStatus);

// Change the present location of a specific parcel delivery order
router.put('/parcels/:id/presentLocation', auth.adminRole, Parcel.updateParcelLocation);

export default router;
