const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the folder where files will be stored on the server
  filename: function (req, file, cb) {
    // Generate a unique file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
