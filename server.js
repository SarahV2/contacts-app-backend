import express from 'express';
import config from './config';
import mongoose from 'mongoose';
import contactsRoutes from './routes/contacts';
import userRoutes from './routes/users';

const app = express();

app.get('/', (req, res) => {
  res.send('Up and Running!');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/contacts', contactsRoutes);
app.use('/api/users', userRoutes);

//  serve static files
app.use(express.static('public'));

const port = 5000 || process.env.PORT;

const { MONGO_URI, MONGO_DB_NAME } = config;

const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
