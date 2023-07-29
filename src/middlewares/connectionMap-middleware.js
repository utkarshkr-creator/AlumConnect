const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { SuccessResponse, ErrorResponse } = require("../utils/common");


function validateCreateRequest(req, res, next) {
    if(!req.body.sender) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['sender not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.receiver) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['receiver not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.status) {
        ErrorResponse.message = 'Something went wrong while creating Account';
        ErrorResponse.error = new AppError(['status not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

function updateStatus(req, res, next) {
    if(!req.body.status) {
        ErrorResponse.message = 'Something went wrong while updating data';
        ErrorResponse.error = new AppError(['status not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    next();
}
function getByStatus(req, res, next) {
    
    if(!req.body.status) {
        ErrorResponse.message = 'Something went wrong while Geting data';
        ErrorResponse.error = new AppError(['status not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.id) {
        ErrorResponse.message = 'Something went wrong while Geting data';
        ErrorResponse.error = new AppError(['id not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    
    next();
}


module.exports={
    validateCreateRequest,
    updateStatus,
    getByStatus
}