import moment from 'moment';
import { v4 as uuid } from 'uuid';
import db from '../index';
import role from '../config/config';

const Parcel = {

  async create(req, res) {
    if (!req.body.recipient && !req.body.weight && !req.body.destination && !req.body.phone) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const text = `INSERT INTO 
        parcels(id, recipient, weight, destination, phone, owner_id, status, location, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *`;

    const values = [
      uuid(),
      req.body.recipient,
      req.body.weight,
      req.body.destination,
      req.body.phone,
      req.user.id,
      role.status.default,
      req.body.location,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(200).send({
        message: 'Parcel created successfuly',
        Parcel: rows[0],
      });
    } catch (err) {
      return res.status(400).send({
        err,
        message: 'Error when creating parcel, Please try again!',
      });
    }
  },

  async getUserParcel(req, res) {
    const findAll = 'SELECT * FROM parcels WHERE owner_id=$1';
    try {
      const { rows, rowCount } = await db.query(findAll, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send({
        err,
        message: 'You have not sent any parcel!',
      });
    }
  },

  async getOneParcel(req, res) {
    const text = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async updateParcel(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id=$1 AND owner_id = $2';
    const updateOneQuery = `UPDATE parcels
          SET destination=$1,modified_date=$2
          WHERE id=$3 AND owner_id = $4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }

      const values = [
        req.body.destination || rows[0].destination,
        moment(new Date()),
        req.params.id,
        req.user.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  async updateParcelStatus(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id=$1';
    const updateOneQuery = `UPDATE parcels SET status=$1,modified_date=$2
          WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }

      const values = [
        req.body.status || rows[0].status,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send({
        err,
        message: 'Failed to update parcel status! Try again...',
      });
    }
  },

  async updateParcelLocation(req, res) {
    const findOneQuery = 'SELECT * FROM parcels WHERE id=$1';
    const updateOneQuery = `UPDATE parcels SET location=$1,modified_date=$2
          WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }

      const values = [
        req.body.location || rows[0].status,
        moment(new Date()),
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send({
        Update: response.rows[0],
        message: 'Updated successfully',
      });
    } catch (err) {
      return res.status(400).send({
        err,
        message: 'Failed to update parcel location! Try again...',
      });
    }
  },

  async cancelParcel(req, res) {
    const deleteQuery = 'DELETE FROM parcels WHERE id=$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: 'parcel not found' });
      }
      return res.status(200).send({ message: 'Parcel delivery canceled successfully' });
    } catch (err) {
      return res.status(400).send({
        err,
        message: 'Failed to cancel parcel order! Try again...',
      });
    }
  },
};

export default Parcel;
