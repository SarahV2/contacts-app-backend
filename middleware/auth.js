import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET } = config;

export default (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized, No token was provided' });
  } else {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(400).json({ message: 'Invalid Token' });
    }
  }
};
