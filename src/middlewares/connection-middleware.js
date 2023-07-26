const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { SuccessResponse, ErrorResponse } = require("../utils/common");


function validateCreateRequest(req, res, next) {
    if(!req.body.status) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['status not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports={
    validateCreateRequest,
}