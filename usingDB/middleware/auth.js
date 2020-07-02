import db from "../index";
import jwt from 'jsonwebtoken';
import config from '../config/config';

const userRole = async(req, res, next) => {
    const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {
            const text = 'SELECT * FROM users WHERE id = $1';
            const decoded = jwt.verify(token, process.env.SECRET);
            const { rows } = await db.query(text, [decoded.userId]);
            if(rows[0].role == config.accessLevels.user){
                req.user = { id: decoded.userId };
                next();
            }
            else{
                return res.status(403).send({"Oops!":"You are not authorized"})
            }
        } catch (error) {
            return res.status(400).send(error);
        }
};

const adminRole = async(req, res, next) => {
    const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await db.query(text, [decoded.userId]);
            if(rows[0].role == config.accessLevels.admin){
                req.user = { id: decoded.userId };
                next();
            }
            else{
                return res.status(403).send({"Oops!":"You are not authorized"})
            }
        } catch (error) {
            return res.status(400).send(error);
        }
}

export default { userRole, adminRole };