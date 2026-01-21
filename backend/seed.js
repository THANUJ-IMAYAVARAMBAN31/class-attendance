require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Head = require('./models/Head');
const Security = require('./models/Security');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Head.deleteMany();
  await Security.deleteMany();

  await Head.create({ password: await bcrypt.hash('head123', 10) });
  await Security.create({ password: await bcrypt.hash('sec123', 10) });

  console.log('Head: head123');
  console.log('Security: sec123');
  process.exit();
})();
