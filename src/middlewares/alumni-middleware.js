const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    
    if(!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['name not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.email) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['email  not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.phoneNumber ) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['phone Number  not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.graduationYear) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['graduation Year not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.branch) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['branch not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);``
    }
    if(!req.body.degreeCertificate) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['degree Certificate not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}