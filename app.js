const cors = require('cors');
const express = require('express');
const app = express();

const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const { authentication } = require('./controllers/authController');

let corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notes', authentication, noteRouter);
// Test api
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'working fine..' });
// });

module.exports = app;
