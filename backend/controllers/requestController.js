const Request = require('../models/Request');

exports.requestAccess = async (req, res) => {
  try {
    const { username, password, branch } = req.body;

    if (!branch) {
      return res.status(400).json({ error: 'Branch is required' });
    }

    const request = new Request({
      username,
      password,
      branch,
      status: 'PENDING'
    });

    await request.save();
    res.json({ message: 'Request sent to Head' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
