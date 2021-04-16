import express from 'express';
import Contact from '../models/Contact';
import auth from '../middleware/auth';

// TODO: Link Contact to User, then make routes private by adding the middleware

const router = express.Router();

// Get All Contacts
router.get('/', async (req, res) => {
  try {
    let allContacts = await Contact.find();
    if (!allContacts) throw Error('No Contacts were found');

    res.status(200).json({
      contacts_list: allContacts,
      total_num_contacts: allContacts.length,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Get Contact by ID
router.get('/:id', async (req, res) => {
  try {
    let contact = await Contact.findOne({ _id: req.params.id });
    if (!contact) throw Error('Error');

    res.status(200).json({
      contact,
      message: 'Success',
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// POST a new Contact

router.post('/', auth, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    let newContact = new Contact({ firstName, lastName, phoneNumber, email });
    await newContact.save();
    res.status(200).json({
      new_contact: newContact,
      message: `Successfully added ${firstName} as a contact!`,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Edit Contact Info

router.patch('/:id', async (req, res) => {
  try {
    await Contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, useFindAndModify: false },
      (error, contact) => {
        if (error) {
          return res.status(400).json({ message: 'an error occured' });
        }
        return res.status(200).json({
          message: 'successfully updated',
          updated_contact: contact,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Find Contact by ID

router.get('/:id', async (req, res) => {
  try {
    await Contact.findOne({ _id: req.params.id }, (error, foundContact) => {
      if (error) {
        return res.status(400).json({ message: 'an error occured' });
      }
      return res.status(200).json({ foundContact });
    });
  } catch (error) {
    return res.status(500).json({ message: 'internal server error' });
  }
});

// Delete Contact by id

router.delete('/:id', async (req, res) => {
  try {
    await Contact.remove({ _id: req.params.id }, (error, contact) => {
      if (error) {
        return res.status(400).json({ error: 'an error occured' });
      }
      return res.status(200).json({ message: 'successfully deleted contact' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'internal server error' });
  }
});
export default router;
