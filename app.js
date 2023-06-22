const express = require('express');
const path = require('path');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const topicRoutes = require('./routes/topicRoutes');
const commentRoutes = require('./routes/commentRoutes');

const insertDataRoutes = require('./routes/insertDataRoutes');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'svelte', 'public')));

// 3) routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/insertData', insertDataRoutes);

app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

module.exports = app;
