require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors({ origin: ['http://localhost:5173' ,'https://class-attendance-ten.vercel.app/']}));
app.use(express.json());

app.use('/api/head', require('./routes/headRoutes'));
app.use('/api/security', require('./routes/securityRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

connectDB().then(() => {
  app.listen(5000, () =>
    console.log(`Server running on ${5000}`)
  );
});
