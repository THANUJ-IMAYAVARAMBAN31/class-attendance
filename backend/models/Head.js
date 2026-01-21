const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const headSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  }
});

headSchema.statics.login = async function (password) {
  const head = await this.findOne();
  if (!head) throw Error('Head not found');

  const match = await bcrypt.compare(password, head.password);
  if (!match) throw Error('Incorrect password');

  return head;
};

module.exports = mongoose.model('Head', headSchema);
