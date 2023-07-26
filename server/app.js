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
const originWhitelist = [
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'https://reddit-clone-bqh.vercel.app',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(morgan('dev'));

// app.use(express.static(path.join(__dirname, 'svelte', 'public')));
// app.options('*', cors());

app.use(
  cors({
    origin: true,
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
