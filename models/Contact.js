import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: 'Please enter the first name',
  },
  lastName: {
    type: String,
    required: 'Please enter the last name',
  },
  phoneNumber: {
    type: Number,
    required: 'phone number is required',
  },
  email: {
    type: String,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const Contact = model('Contact', contactSchema);

export default Contact;
