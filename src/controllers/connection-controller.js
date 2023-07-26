const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {ConnectionService}=require('../services');


async function create(req,res){
     try {
        const connection=await ConnectionService.create({status:req.body.status}); 
        SuccessResponse.data=connection; 
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse);
     } catch (error) {
        ErrorResponse.error=error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
     }
}

async function getbyId(req,res){
     try {
        const connection=await ConnectionService.get(req.params.id); 
        SuccessResponse.data=connection; 
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse);
     } catch (error) {
        ErrorResponse.error=error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
     }
}

module.exports={
    create,
    getbyId,

}