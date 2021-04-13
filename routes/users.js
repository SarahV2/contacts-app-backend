import express from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET } = config;

console.log(JWT_SECRET)
const router = express.Router();

// register a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    await newUser.save();
    return res.status(201).json({ message: 'Successfully registered!' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/auth', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // otherwise, if the user actually exists, we'll check the password
    if (!user.comparePassword(req.body.password, user.hashPassword)) {
      return res.status(401).json({ message: 'Authentication Failed' });
    } else {
      /* once the user is authenticated, generate jwt token and sign it
        with the user's email, username and id */
      const { email, username, id } = user;
      return res
        .status(200)
        .json({ token: jwt.sign({ email, username, id }, JWT_SECRET)});
    }
  } catch (error) {
      console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;