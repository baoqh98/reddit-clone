import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const port = 3000;

app.listen(port, () => {
  console.log(`App running on ${port}...`);
});
