const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { ConnectionMapService } = require("../services");
const { ConnectionService } = require("../services");
const { AlumniService } = require("../services");

async function createConnection(req, res) {
  try {
    const { alumni_id_1, alumni_id_2, status } = req.body;
    const newConnection = await ConnectionService.create({ status });
    // const connection1=await AlumniService.get(alumni_id_1);
    // const connection2=await AlumniService.get(alumni_id_2);

    // console.log(newConnection);
    const newConnectionMap=await ConnectionMapService.create({
        alumni_id_1:alumni_id_1,
        alumni_id_2:alumni_id_2,
        connection_id:newConnection.id
    });
    // const newConnectionMap=await newConnection.createUser({alumni_id_1, alumni_id_2});

     
    SuccessResponse.data = newConnectionMap;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createConnection,
};
