const express = require('express');
const { register, login, logout } = require('../controllers/AuthControllers');
const { googleLogin } = require('../controllers/GoogleAuthController'); // ✅ Add this
const authMiddleware = require('../middleware/Auth'); // Correct the file name
const router = express.Router();

// Normal Auth
router.post('/register', register);
router.post('/login', login);
// router.post('/logout', logout);
router.post('/logout', authMiddleware, logout); // Ensure both middleware and handler are valid

router.post('/google-login', googleLogin);

router.get('/test', (req, res) => res.send('Auth route is working!'));

module.exports = router;       