import moment from 'moment';
import { v4 as uuid } from 'uuid';
import help from '../config/helper';
import role from '../config/config';
import db from '../index';

const User = {
  async create(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.phone) {
      return res.status(404).send({ message: 'Some values are missing!' });
    }
    if (!help.isValidEmail(req.body.email)) {
      return res.status(404).send({ message: 'Please enter a valid email address!' });
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
      role.userRoles.user,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = help.generateToken(rows[0].id);
      delete rows[0].password;
      rows[0].token = token;

      return res.status(200).send({
        status: 200,
        message: 'User successfully created',
        Profile: rows[0],
        Token: token,
      });
    } catch (err) {
      if (err.routine === '_bt_check_unique') {
        return res.status(400).send({ status: 400, message: 'User with EMAIL already exist' });
      }
      return res.status(500).send(err.detail);
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
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!help.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({
          message: 'The credentials you provided is incorrect, check your password',
        });
      }
      // console.log(rows[0]);
      const token = help.generateToken(rows[0].id);

      delete rows[0].password;
      rows[0].token = token;

      res.status(200).send({
        message: 'User login successful!',
        Profile: rows[0],
      });
    } catch (error) {
      return res.status(500).send({ message: error.detail });
    }
  },

  async getUser(req, res) {
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    try {
      const { rows } = await db.query(findOneQuery, [req.user.id]);

      const token = help.generateToken(rows[0].id);
      delete rows[0].password;

      return res.status(200).send({
        message: 'User found successfully!',
        Profile: rows[0],
        Token: token,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  authenticate(req, res) {
    try {
      const { credentials } = req.user;

      const filteredCredentials = {
        id: credentials.id,
        firstname: credentials.firstname,
        lastname: credentials.lastname,
        email: credentials.email,
        location: credentials.location,
        phone: credentials.phone,
        role: credentials.role,
        token: credentials.token,
      };

      // Send response
      res.status(200).json({
        Profile: {
          ...filteredCredentials,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'SignIn again. Authentication failed!',
      });
    }
  },
};

export default { User };
