const express = require('express');
const { getProtectedData } = require('../controllers/ProtectedControllers');
const router = express.Router();
const authMiddleware = require('../middleware/Auth');

// /protected/
router.get('/', authMiddleware, getProtectedData);

module.exports = router;
