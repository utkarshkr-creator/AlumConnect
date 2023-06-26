const {PictureUpload } = require("../utils/common");
const upload = PictureUpload.single("picture");
const {StatusCodes}=require('http-status-codes')

function validateCreateRequest(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer-related errors
      return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    } else if (err) {
      // Handle other errors
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something went wrong" });
    }
    // File upload completed successfully
    next();
  });
}

module.exports = {
  validateCreateRequest
};
