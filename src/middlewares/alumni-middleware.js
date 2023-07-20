const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const {AlumniService}=require('../services')
const {AuthChecker}=require('../controllers')
const { SuccessResponse, ErrorResponse } = require("../utils/common");

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


function validateGetByName(req,res,next){
    if(!req.query.name) {
        ErrorResponse.message = 'Something went wrong while getting result by Name';
        ErrorResponse.error = new AppError(['name not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}
function validateGetByBranch(req,res,next){
    if(!req.query.branch) {
        ErrorResponse.message = 'Something went wrong while getting result by Branch';
        ErrorResponse.error = new AppError(['branch not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}
function validateGetByBatch(req,res,next){
    if(!req.query.batch) {
        ErrorResponse.message = 'Something went wrong while getting result by Batch';
        ErrorResponse.error = new AppError(['batch not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}
async function checkAuth(req, res, next) {
    try {
        const response = await AlumniService.isAuthenticated(req.headers['xaccesstoken']);
        if(response) {
            req.params.user = response; // setting the user id in the req object
            next();
        }
    } catch(error) {
        return res
                .status(error.statusCode)
                .json(error);
    }
    
}

async function checkAuthOnly(req, res, next) {
    try {
        const response = await AuthChecker.AuthChecker(req.headers['xaccesstoken']);
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse);
    } catch(error) {
        return res
                .status(error.statusCode)
                .json(error);
    }
    
}


module.exports = {
    validateCreateRequest,
    validateGetByName,
    validateGetByBranch,
    validateGetByBatch,
    checkAuth,
    checkAuthOnly
}