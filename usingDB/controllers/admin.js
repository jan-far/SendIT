import moment from 'moment';
import { v4 as uuid } from 'uuid';
import help from '../config/helper';
import role from '../config/config';
import db from '../index';

const Admin = {

  async create(req, res) {
    if (!help.isValidEmail(req.body.email)) {
      return res.status(404).send('Please enter a valid email address');
    }

    const hashPassword = help.hashPassword(req.body.password);

    const createQuery = `INSERT INTO 
        users(id, firstname, lastname, email, password, phone, location, role, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *`;

    const values = [
      uuid(),
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashPassword,
      req.body.phone,
      req.body.location,
      role.userRoles.admin,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = help.generateToken(rows[0].id);
      return res.status(200).send({ message: 'Admin successfully created', token });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with EMAIL already exist' });
      }
      return res.status(400).send(err.detail);
    }
  },

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(404).send({ message: 'Some values are missing!' });
    }
    if (!help.isValidEmail(req.body.email)) {
      return res.status(404).send({ message: 'Please enter a valid email address!' });
    }

    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      console.log(rows[0]);

      // Check if user exist
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }

      // Check if user password is correct
      if (!help.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect, check your password' });
      }

      if (rows[0].role !== role.accessLevels.admin) {
        return res.status(400).send({ message: 'You are not authorized' });
      }

      const token = help.generateToken(rows[0].id);

      [req.authenticated] = rows;
      req.authenticated.token = token;
      // console.log('auth', req.authenticated);

      res.status(200).send({
        message: 'Admin login successful!',
        Profile: rows[0],
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async getUser(req, res) {
    const findAll = 'SELECT * FROM users WHERE id=$1';
    try {
      const { rows, rowCount } = await db.query(findAll, [req.params.id]);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send({
        error,
        message: 'No user found!',
      });
    }
  },

  async getUsers(req, res) {
    const findAll = 'SELECT * FROM users';
    try {
      const { rows, rowCount } = await db.query(findAll);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send({
        error,
        message: 'No user found!',
      });
    }
  },

  async getAllParcel(req, res) {
    const findAll = 'SELECT * FROM parcels ';
    try {
      const { rows, rowCount } = await db.query(findAll);
      return res.status(200).send({ rows, rowCount });
    } catch (err) {
      return res.status(400).send({
        err,
        message: 'No user have sent any parcel!',
      });
    }
  },

  async getParcelByOwner(req, res) {
    const findUser = 'SELECT * FROM parcels WHERE owner_id=$1';

    try {
      const { rows, rowCount } = await db.query(findUser, [req.params.id]);
      if (!rows || rows === []) {
        return res.send({ message: 'Parcel Not found or not created' });
      }
      res.status(200).send({
        rows,
        rowCount,
        message: 'Parcel found',
      });
    } catch (error) {
      res.status(400).send({
        message: error,
      });
    }
  },

  async getParcelById(req, res) {
    const findParcel = 'SELECT * FROM parcels WHERE id=$1';

    try {
      const { rows, rowCount } = await db.query(findParcel, [req.params.id]);
      if (!rows || rows === []) {
        return res.send({ message: 'Parcel Not found or not created' });
      }
      res.status(200).send({
        rows,
        rowCount,
      });
    } catch (error) {
      res.status(400).send({
        message: error,
      });
    }
  },
};

const functions = `
CREATE OR REPLACE FUNCTION get_all_user() RETURNS SETOF users AS
$BODY$
DECLARE
    r users;
BEGIN
    FOR r IN
        SELECT * FROM users
    LOOP
        -- can do some processing here
        RETURN NEXT r; -- return current row of SELECT
    END LOOP;
    RETURN;
END
$BODY$
$$LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_user_parcel(id INT) RETURNS SETOF parcels AS
$BODY$
BEGIN
    RETURN QUERY SELECT * FROM parcels WHERE owner_id=$1;

    -- Since execution is not finished, we can check whether rows were returned
    -- and raise exception if not.
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No parcel at %.', $1;
    END IF;

    RETURN;
END
$BODY$
$$LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get() RETURNS SETOF parcels AS $BODY$
DECLARE
    r users
BEGIN 
    FOR r IN SELECT id FROM users
    LOOP
        IF r IS NOT NULL OR r!=''
          RETURN NEXT SELECT * FROM parcels WHERE owner_id=$1 VALUES (r);
      END LOOP;
      RETURN;
END
$BODY$
LANGUAGE plpgsql;
`;

export default Admin;
