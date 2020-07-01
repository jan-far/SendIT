import userModel from '../models/user';
import help from './helper';
import jwt from 'jsonwebtoken';

const User = {
    create(req, res){
        if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || !req.body.phone) {
            res.status(404).send('Some values are missing!')
          }
        if (!help.isValidEmail(req.body.email)) {
            res.status(404).send( 'Please enter a valid email address');
        }
        const user = userModel.create(req.body);
        
        const token = help.generateToken(user)
        return res.status(200).send({'message': 'User registered successfully', 'token': token })
    
    },

    login(req, res){
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!help.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        // const token = req.headers['x-access-token'];
        // const decoded = jwt.verify(token, process.env.SECRET);

        const user = userModel.findOne(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
    
        var passwordIsValid = help.comparePassword(req.body.password, user.password);
    
        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
            });
        }
    
        res.status(200).send({
            id: user.id,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email
        });
    }
}

export default User;