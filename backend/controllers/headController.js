const Head = require('../models/Head');
const Request = require('../models/Request');
const User = require('../models/User');
const generateQR = require('../middlewares/qrGenerator');
const { createToken } = require('../config/jwtConfig');
const Attendance = require('../models/Attendance');
const Class = require('../models/Class');

exports.loginHead = async (req, res) => {
  try {
    const { password } = req.body;
    const head = await Head.login(password);

    const token = createToken(head._id, 'head');
    res.json({ token, role: 'head' });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'PENDING' });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approve = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const user = new User({
      username: request.username,
      password: request.password,
      branch: request.branch
    });

    await user.save();

    user.qrCode = await generateQR(`USER:${user._id}`);
    await user.save();

    request.status = 'APPROVED';
    await request.save();

    res.json({ message: 'User approved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reject = async (req, res) => {
  try {
    await Request.findByIdAndUpdate(req.params.id, {
      status: 'REJECTED'
    });
    res.json({ message: 'User rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassesByBranch = async (req, res) => {
  try {
    const { branch } = req.query;
    const classes = await Class.find({ branch });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersByClass = async (req, res) => {
  try {
    const { branch, className } = req.query;

    const users = await User.find({ branch, className })
      .select('-password');

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassAttendance = async (req, res) => {
  try {
    const { classId } = req.query;
    const date = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.find({
      class: classId,
      date
    }).populate('user', 'username');

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAbsentStudents = async (req, res) => {
  try {
    const { classId } = req.query;

    const cls = await Class.findById(classId);
    if (!cls) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // 1️⃣ Students who SHOULD attend (branch-based)
    const expectedUsers = await User.find({
      branch: cls.branch
    });

    // 2️⃣ Students who DID attend
    const attendance = await Attendance.find({
      class: classId,
      date: cls.classDate
    });

    const presentUserIds = attendance.map(a =>
      a.user.toString()
    );

    // 3️⃣ ABSENT = expected − present
    const absentUsers = expectedUsers.filter(
      u => !presentUserIds.includes(u._id.toString())
    );

    res.json(absentUsers);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserAttendance = async (req, res) => {
  try {
    const logs = await Attendance.find({
      user: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const { branch, className, classDate, startTime, endTime } = req.body;
    if (!branch || !className || !classDate || !startTime || !endTime) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const cls = new Class({
      branch,
      className,
      classDate,
      startTime,
      endTime,
      createdBy: req.user.id
    });

    await cls.save();
    res.json(cls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassesByBranch = async (req, res) => {
  try {
    const { branch } = req.query;

    const classes = await Class.find({ branch });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};