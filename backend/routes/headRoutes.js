const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
  loginHead,
  getRequests,
  approve,
  reject,
  createClass,
  getClassesByBranch,
  getUsersByClass,
  getUserAttendance,
  getClassAttendance,
  getAbsentStudents
} = require('../controllers/headController');

router.post('/login', loginHead);
router.get('/requests', auth, getRequests);
router.post('/approve/:id', auth, approve);
router.post('/reject/:id', auth, reject);

router.post('/class', auth, createClass);       
router.get('/classes', auth, getClassesByBranch);
router.get('/attendance', auth, getClassAttendance);
router.get('/absent', auth, getAbsentStudents);
router.get('/users', auth, getUsersByClass);
router.get('/attendance/:userId', auth, getUserAttendance);

module.exports = router;
