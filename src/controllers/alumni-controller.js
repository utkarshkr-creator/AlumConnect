const { StatusCodes } = require('http-status-codes');

const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {AlumniService}=require('../services')

async function createAlumni(req,res){
    try {
        const alumni=await AlumniService.createAlumni({
            name:req.body.name,  
            email:req.body.email,
            password:req.body.password,  
            phoneNumber:req.body.phoneNumber,
            graduationYear:req.body.graduationYear,
            gender:req.body.gender, 
            branch:req.body.branch, 
            degreeCertificate:req.body.degreeCertificate,
            verified:req.body.verified,
        })
        SuccessResponse.data=alumni;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function signin(req,res){
    try {
        // console.log(req.body)
        const response=await AlumniService.signin({
            email:req.body.email,
            password:req.body.password
        })
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse);
    } catch (error) {
        // console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getAll(req,res){
    try {
        const response=await AlumniService.getAll()
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
async function profile(req,res){
    try {
        // console.log(req.user);
        const response=await AlumniService.get(req.user)
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
async function getUserByName(req,res){
    try {
        const response=await AlumniService.getUserByName(req.query.name)
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
async function getUserByBranch(req,res){
    try {
        // console.log(req);
        const response=await AlumniService.getUserByBranch(req.query.branch)
        SuccessResponse.data=response;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports={
    createAlumni,
    signin,
    getAll,
    getUserByName,
    getUserByBranch,
    profile

}