import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

import insertDataRoutes from './routes/insertDataRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const route = router.get('/', (req, res) => {
  res.send('Hello world');
});

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 3) routes
app.use('/', route);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.use('/api/insertData', insertDataRoutes);

export default app;
