import ParcelModel from '../models/Parcel';

const Parcel = {

  async create(req, res) {
    if (!req.body.email && !req.body.weight && !req.body.destination && !req.body.phone) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const parcel = await ParcelModel.create(req.body, req.user);
    return res.status(200).send(parcel);
  },

  async getAll(req, res) {
    const parcels = await ParcelModel.findAll();
    return res.status(200).send(parcels);
  },

  async getOne(req, res) {
    const parcel = await ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    return res.status(200).send(parcel);
  },

  async get_for_a_user(req, res) {
    const owner = await ParcelModel.findOwner(req.params.id);
    if (!owner) {
      return res.status(404).send({ message: 'You have not sent any parcel!' });
    }
    return res.status(200).send({
      owner,
      // message: 'Done!',
    });
  },

  async update(req, res) {
    const parcel = await ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    const updatedParcel = await ParcelModel.update(req.params.id, req.body);
    return res.status(200).send({
      updatedParcel,
      message: 'Parcel successfully updated',
    });
  },

  async delete(req, res) {
    const parcel = await ParcelModel.findOne(req.params.id);
    if (!parcel) {
      return res.status(404).send({ message: 'parcel not found' });
    }
    await ParcelModel.delete(req.params.id);
    return res.status(204).send({ message: 'Parcel successfully canceled' });
  },
};
export default Parcel;
