import moment from 'moment';
import { v4 as uuid } from 'uuid';
import help from './helper';
import db from "../index";

const Parcel = {

    async create(req, res){
        if (!req.body.email && !req.body.weight && !req.body.destination && !req.body.phone) {
            return res.status(400).send({'message': 'All fields are required'})
          }

        const text = `INSERT INTO 
        parcels(id, email, weight, destination, phone, owner_id, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`

        const values = [
            uuid(),
            req.body.email,
            req.body.weight,
            req.body.destination,
            req.body.phone,
            req.user.id,
            moment(new Date()),
            moment(new Date())
        ];

        try{
            const { rows } = await db.query(text, values)
            return res.status(200).send({
                'message': 'Parcel created successfuly',
                'Parcel': rows[0]
            })
        }catch(err){
            return res.status(400).send(err)
        }
    },

    async getUserParcel(req, res){
        const findAll = 'SELECT * FROM parcels WHERE owner_id=$1';
        try{
            const { rows, rowCount } = await db.query(findAll, [req.user.id]);
            return res.status(200).send({ rows, rowCount });
        }catch(err){
            return res.status(400).send(err)
        }
    },

    async getOneParcel(req, res) {
        const text = 'SELECT * FROM parcels WHERE id = $1 AND owner_id = $2';
        try {
          const { rows } = await db.query(text, [req.params.id, req.user.id]);
          if (!rows[0]) {
            return res.status(404).send({'message': 'parcel not found'});
          }
          return res.status(200).send(rows[0]);
        } catch(error) {
          return res.status(400).send(error)
        }
      },

      async updateParcel(req, res) {
        const findOneQuery = 'SELECT * FROM parcels WHERE id=$1 AND owner_id = $2';
        const updateOneQuery =`UPDATE parcels
          SET destination=$1,modified_date=$2
          WHERE id=$3 AND owner_id = $4 returning *`;
        try {
          const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
          if(!rows[0]) {
            return res.status(404).send({'message': 'parcel not found'});
          }

          const values = [
            req.body.destination || rows[0].destination,
            moment(new Date()),
            req.params.id,
            req.user.id
          ];
          const response = await db.query(updateOneQuery, values);
          return res.status(200).send(response.rows[0]);
        } catch(err) {
          return res.status(400).send(err);
        }
      },

      async cancelParcel(req, res) {
        const deleteQuery = 'DELETE FROM parcels WHERE id=$1 AND owner_id = $2 returning *';
        try {
          const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
          if(!rows[0]) {
            return res.status(404).send({'message': 'parcel not found'});
          }
          return res.status(200).send({ 'message': 'deleted' });
        } catch(error) {
          return res.status(400).send(error);
        }
      }
}

export default Parcel;