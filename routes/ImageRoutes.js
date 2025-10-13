const express = require('express');
const router = express.Router();
const {
  uploadImage,
  deleteImage,
  updateImage,
} = require('../controllers/ImageControllers');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/CloudinaryConfig');


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('image'), uploadImage);
router.put('/ ', upload.single('image'), updateImage);
router.delete('/delete', deleteImage);

module.exports = router;
