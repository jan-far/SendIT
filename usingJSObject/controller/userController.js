import userModel from '../models/user';
import help from './helper';

const User = {
  async create(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.phone) {
      res.status(404).send('Some values are missing!');
    }
    if (!help.isValidEmail(req.body.email)) {
      res.status(404).send('Please enter a valid email address');
    }
    const user = await userModel.create(req.body);

    const token = help.generateToken(user);
    return res.status(200).send({ message: 'User registered successfully', token });
  },

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'Some values are missing' });
    }
    if (!help.isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }

    const user = await userModel.findByEmail(req.body.email);
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }
    const passwordIsValid = help.comparePassword(user.password, req.body.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    return res.status(200).send({
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
    });
  },

  async getUser(req, res) {
    const user = await userModel.findAll();
    return res.status(200).send({
      ...user,
    });
  },

  async getAuser(req, res) {
    const user = await userModel.findOne(req.param.id);
    return res.status(200).send({
      user,
    });
  },
};

export default User;
