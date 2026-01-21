const Security = require('../models/Security');
const User = require('../models/User');
const Attendance = require('../models/Attendance');
const { createToken } = require('../config/jwtConfig');
const{ calculateTime }= require('../middlewares/timeCalculator');
const Class = require('../models/Class');

const loginSecurity = async (req, res) => {
  try {
    const { password } = req.body;
    const security = await Security.login(password);
    const token = createToken(security._id, 'security');
    res.json({ token, role: 'security' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const scanQR = async (req, res) => {
  try {
    const { qrData } = req.body;
    if (!qrData) {
      return res.status(400).json({ error: 'QR data missing' });
    }

    const userId = qrData.replace('USER:', '');

    const timeToMinutes = (time) => {
      const [h, m] = time.split(':').map(Number);
      return h * 60 + m;
    };

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const now = new Date();
    const istNow = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );

    const todayDate = istNow.toISOString().split('T')[0];
    const currentMinutes =
      istNow.getHours() * 60 + istNow.getMinutes();

    const openAttendance = await Attendance.findOne({
      user: userId,
      date: todayDate,
      timeOut: null
    }).populate('class');

    if (openAttendance) {
      openAttendance.timeOut = istNow;
      openAttendance.durationMinutes = calculateTime(
        openAttendance.timeIn,
        istNow
      );
      openAttendance.status = 'OUT';

      await openAttendance.save();

      return res.json({ message: 'Time Out marked' });
    }

    const classesToday = await Class.find({
      branch: user.branch,
      classDate: todayDate
    });

    const activeClass = classesToday.find(cls => {
      const start = timeToMinutes(cls.startTime);
      const end = timeToMinutes(cls.endTime);
      return currentMinutes >= start && currentMinutes <= end;
    });

    if (!activeClass) {
      return res.status(400).json({
        error: 'No active class to mark attendance'
      });
    }

    const lateAfter =
      timeToMinutes(activeClass.startTime) + 5;

    const isLate = currentMinutes > lateAfter;

    const attendance = new Attendance({
      user: userId,
      class: activeClass._id,
      date: todayDate,
      timeIn: istNow,
      status: isLate ? 'LATE' : 'IN'
    });

    await attendance.save();

    res.json({
      message: isLate ? 'Late entry marked' : 'Time In marked'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


module.exports = { loginSecurity, scanQR };
