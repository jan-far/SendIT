import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import db from '../index';
import config from '../config/config';

const userRole = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ message: 'Token is not provided' });
  }
  try {
    const text = 'SELECT * FROM users WHERE id = $1';
    const decoded = jwt.verify(token, process.env.SECRET);
    const { rows } = await db.query(text, [decoded.userId]);
    if (rows[0].role === config.accessLevels.user || config.accessLevelss.admin) {
      delete rows[0].password;
      rows[0].token = token;
      req.user = { id: decoded.userId, credentials: rows[0] };
      next();
    } else {
      return res.status(403).send({ message: 'You are not authorized' });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired. Log in to sign another.' });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Session expired. Log in again!.' });
    }
    return res.status(500).json({ message: { ...error } });
  }
};

const adminRole = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ message: 'Token is not provided' });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const text = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(text, [decoded.userId]);
    if (rows[0].role === config.accessLevels.admin) {
      delete rows[0].password;
      rows[0].token = token;
      req.user = { id: decoded.userId, credentials: rows[0] };
      next();
    } else {
      return res.status(403).send({
        message: 'You are not authorized',
      });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired. Log in to sign another.' });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Session expired. Log in again!.' });
    }
    return res.status(500).json({ message: { ...error } });
  }
};

export default { userRole, adminRole };
