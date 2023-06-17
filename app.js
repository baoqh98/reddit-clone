const express = require('express');
const path = require('path');

const globalErrorHandler = require('./controllers/errorController');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const insertDataRoutes = require('./routes/insertDataRoutes');

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
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use('/api/insertData', insertDataRoutes);

app.use(globalErrorHandler);

module.exports = app;
