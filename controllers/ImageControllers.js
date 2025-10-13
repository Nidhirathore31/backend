const cloudinary = require('../config/CloudinaryConfig');

exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image file uploaded' });

  try {
    res.status(200).json({
      message: 'Image uploaded successfully',
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteImage = async (req, res) => {
  const { public_id } = req.body;
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    if (result.result !== 'ok') {
      return res.status(404).json({ message: 'Image not found or already deleted' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateImage = async (req, res) => {
  const { old_public_id } = req.body;

  try {
    await cloudinary.uploader.destroy(old_public_id);

    if (!req.file) return res.status(400).json({ message: 'No new image uploaded' });

    // If req.file already contains Cloudinary info (from multer-storage-cloudinary)
    if (req.file.path && req.file.filename) {
      return res.status(200).json({
        message: 'Image updated successfully',
        url: req.file.path,
        public_id: req.file.filename,
      });
    }

    // If using plain multer, upload to Cloudinary manually
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({
      message: 'Image updated successfully',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};