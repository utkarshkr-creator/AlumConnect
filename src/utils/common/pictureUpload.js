const multer = require('multer');
console.log("inside multer");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'pictures/', // Specify the folder where files will be stored on the server
  filename: function (req, file, cb) {
    // Generate a unique file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});


const pictureUpload = multer({ storage: storage });

module.exports = pictureUpload;
