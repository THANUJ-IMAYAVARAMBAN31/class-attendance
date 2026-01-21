const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const securitySchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  }
});

securitySchema.statics.login = async function (password) {
  const security = await this.findOne();
  if (!security) throw Error('Security not found');

  const match = await bcrypt.compare(password, security.password);
  if (!match) throw Error('Incorrect password');

  return security;
};

module.exports = mongoose.model('Security', securitySchema);
