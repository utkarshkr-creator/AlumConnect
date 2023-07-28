const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { ConnectionMapService } = require("../services");


async function createConnection(req, res) {
  try {
    const { sender,receiver, status } = req.body;
    const newConnectionMap=await ConnectionMapService.create({
        sender_id:sender,
        receiver_id:receiver,
        connection_status:status
    });
    SuccessResponse.data = newConnectionMap;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}


async function getByIds(req,res){
  try {
      const response=await ConnectionMapService.getBySenderReceiverId(req.params)
      SuccessResponse.data=response;
      return res
              .status(StatusCodes.ACCEPTED)
              .json(SuccessResponse);
  } catch (error) {
    console.log(error);
      ErrorResponse.error = error;
      return res
              .status(error.statusCode)
              .json(ErrorResponse);
  }
}

module.exports = {
  createConnection,
  getByIds
};
