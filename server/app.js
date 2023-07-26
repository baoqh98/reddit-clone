const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const topicRoutes = require('./routes/topicRoutes');
const commentRoutes = require('./routes/commentRoutes');
const voteRoutes = require('./routes/voteRoutes');

const app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'svelte', 'public')));

app.use(
  cors({
    origin: [
      'http://localhost:5173/',
      'https://reddit-clone-three-blush.vercel.app/',
    ],
    credentials: true,
  })
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 3) routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/vote', voteRoutes);

app.use(globalErrorHandler);

module.exports = app;
