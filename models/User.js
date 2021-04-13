import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: {
    type: String,
    required: 'true',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const User = model('User', UserSchema);

export default User;
