const User = require('../models/User');
const bcrypt = require('bcrypt');
const { createToken } = require('../config/jwtConfig');
const Attendance = require('../models/Attendance');

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found or not approved' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = createToken(user._id, 'user');
    res.json({
      token,
      user: {
        username: user.username,
        branch: user.branch,
        qrCode: user.qrCode
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 exports.getMyAttendance = async (req, res) => {
   try {
      const logs = await Attendance.find({ user: req.user.id })
        .sort({ date: -1 });

      res.json(logs);
   } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
