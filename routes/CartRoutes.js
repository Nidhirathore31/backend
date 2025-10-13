// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/Auth');
// const { addToCart, getCart } = require('../controllers/CartController');

// router.post('/add', auth, addToCart);
// router.get('/', auth, getCart);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/CartController');
const authMiddleware = require('../middleware/Auth');

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);

module.exports = router;