const express = require('express');
const router = express.Router();

const { loginUser,getMyAttendance } = require('../controllers/userController');
const { requestAccess } = require('../controllers/requestController');
const auth = require('../middlewares/auth');

router.post('/login', loginUser);
router.post('/request', requestAccess);

router.get('/attendance', auth, getMyAttendance);

module.exports = router;
