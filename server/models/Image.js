const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  data: Buffer, // Store the image data as a Buffer
  contentType: String, // Store the content type (e.g., 'image/jpeg', 'image/png')
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
