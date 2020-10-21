import Joi from '@hapi/joi';

const ValidateRegisterBody = {
  async userValidator(req, res, next) {
    let msg = '';
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
        'confirm password': Joi.string().valid(Joi.ref('password'))
          .required()
          .messages({
            'any.only': 'Repeat password must match password',
          }),
        phone: Joi.number(),
        location: Joi.string().alphanum()
          .required(),
      });

      const { error } = requestBodySchema.validate({ ...req.body });
      // console.log(JSON.parse(value));
      console.log(error);

      // Check if error was found duruing validtion
      if (error) {
        msg = error.details[0].message
          .replace('"', '')
          .replace('"', '')
          .replace('firstname', 'First name')
          .replace('lastname', 'Last name')
          .replace('email', 'Email')
          .replace('password', 'Password');

        return res.status(400).send({ status: 400, message: `${msg}` });
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

  async parcelValidator(req, res, next) {
    let msg = '';

    try {
      const requestBodySchema = Joi.object({
        recipient: Joi.string().required(),
        destination: Joi.string().required(),
        weight: Joi.number().required().max(300),
        phone: Joi.number(),
        location: Joi.string().alphanum().required(),
      });

      const { error } = requestBodySchema.validate({ ...req.body });
      // console.log(error);

      // Check if error was found duruing validtion
      if (error) {
        msg = error.details[0].message
          .replace('"', '')
          .replace('"', '')
          .replace('weight', 'Weight')
          .replace('destination', 'Destination')
          .replace('email', 'Email')
          .replace('phone', 'Phone');

        return res.status(400).send({ message: `${msg}` });
      }
      next();
    } catch (error) {
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        response: error.message,
      });
    }
  },
};

export default ValidateRegisterBody;
