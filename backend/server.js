require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://class-attendance-ten.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed'), false);
  },
  credentials: false
}));
app.use(express.json());

app.use('/api/head', require('./routes/headRoutes'));
app.use('/api/security', require('./routes/securityRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

connectDB().then(() => {
  app.listen(5000, () =>
    console.log(`Server running on ${5000}`)
  );
});
