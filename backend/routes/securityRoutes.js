const express = require('express');
const router = express.Router();
const { loginSecurity, scanQR } = require('../controllers/securityController');

router.post('/login', loginSecurity);
router.post('/scan', scanQR);

module.exports = router;
