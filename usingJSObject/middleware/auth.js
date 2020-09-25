import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const Auth = {
  /**
     * Verify Token
     */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      // const text = 'SELECT * FROM users WHERE id = $1';
      // const { rows } = await db.query(text, [decoded.userId]);
      // if (!rows[0]) {
      //     return res.status(400).send({ 'message': 'The token you provided is invalid' });
      // }
      const user = User.findOne(decoded.userId.id);
      if (!user) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId.id };
      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async ValidateRegisterBody(req, res, next) {
    let msg = '';
    // // Check For Email Repeat
    // const emailCheck = await User.findAll(req.body.email.toLowerCase());

    // if (emailCheck) {
    //   msg = `User with email ${req.body.email.toLowerCase()} already registered`;
    //   res.status(400).send(msg);
    // }
    try {
      const requestBodySchema = Joi.object({
        firstname: Joi.string().min(3).max(20).required(),
        lastname: Joi.string().min(3).max(20).required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'org'] },
          })
          .required(),
        password: Joi.string().alphanum().min(7).max(30)
          .required(),
        phone: Joi.number(),
      });

      const { error } = requestBodySchema.validate({ ...req.body });

      // Check if error was found duruing validtion
      if (error) {
        msg = error.details[0].message
          .replace('"', '')
          .replace('"', '')
          .replace('firstname', 'First name')
          .replace('lastname', 'Last name')
          .replace('email', 'Email')
          .replace('password', 'Password');

        res.status(400).send(msg);
      }

      req.body.email = req.body.email.toLowerCase();

      next();
    } catch (error) {
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        response: error.message,
      });
    }
  },

};

export default Auth;
