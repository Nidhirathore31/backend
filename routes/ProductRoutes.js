// const express = require('express');
// const router = express.Router();
// const { addProduct, getProducts } = require('../controllers/ProductController');

// // POST /products/add
// router.post('/add', addProduct);

// // GET /products
// router.get('/get', getProducts);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/ProductController');
const upload = require('../middleware/upload');

router.post('/add', upload.single('image'), addProduct);
router.get('/', getProducts);

module.exports = router;




