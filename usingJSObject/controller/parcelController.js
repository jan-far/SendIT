import ParcelModel from "../models/Parcel";

const Parcel = {

  create(req, res) {
    if (!req.body.email && !req.body.weight && !req.body.destination && !req.body.phone) {
      return res.status(400).send({'message': 'All fields are required'})
    }
    const parcel = ParcelModel.create(req.body, req.user);
    return res.status(201).send(parcel);

  },
  
  getAll(req, res) {
    const parcels = ParcelModel.findAll();
    return res.status(200).send(parcels);
  },
  
  getOne(req, res) {
    const parcel = ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({'message': 'parcel not found'});
    }
    return res.status(200).send(parcel);
  },

  update(req, res) {
    const parcel = ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({'message': 'parcel not found'});
    }
    const updatedParcel = ParcelModel.update(req.params.id, req.body)
    return res.status(200).send(updatedParcel);
  },
 
  delete(req, res) {
    const parcel = ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({'message': 'parcel not found'});
    }
    const ref = ParcelModel.delete(req.params.id);
    return res.status(204).send({'message': 'Parcel successfully canceled'});
  }
}
export default Parcel;