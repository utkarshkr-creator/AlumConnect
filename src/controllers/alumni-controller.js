const { StatusCodes } = require('http-status-codes');
const {FileUpload} = require('../utils/common')
const fs = require('fs');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {AlumniService}=require('../services')


async function createAlumni(req, res) {
    
    try {
      FileUpload.single('degreeCertificate')(req, res, async function (err) {
        if (err) {
          // Handle the file upload error
          // console.error(err);
          ErrorResponse.error = err;
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        }
  
        const alumniData = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          phoneNumber: req.body.phoneNumber,
          graduationYear: req.body.graduationYear,
          gender: req.body.gender,
          branch: req.body.branch,
          degreeCertificate: req.file.filename, // Store the file name in the database
          verified: req.body.verified,
        };
  
        // Create the alumni record
        try {
            // Create the alumni record
            const alumni = await AlumniService.createAlumni(alumniData);
    
            SuccessResponse.data = {
              name: alumni.name,
              email: alumni.email,
            };
            // SuccessResponse.data=alumni;
    
            return res.status(StatusCodes.CREATED).json(SuccessResponse);
          } catch (error) {
            // Delete the uploaded file if user creation fails
            fs.unlinkSync(req.file.path);
    
            ErrorResponse.error = error;
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
          }
      });
    } catch (error) {
      ErrorResponse.error = error;
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
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
async function profileAuthenticated(req,res){
    try {
        const response=await AlumniService.get(req.params.user)
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
        const response=await AlumniService.getRes(req.params.user)
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
async function getUserByBatch(req,res){
    try {
        // console.log(req);
        const response=await AlumniService.getUserByBatch(req.query.batch)
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
    profileAuthenticated,
    getUserByBatch,
    profile
    

}