const {PictureService}=require('../services')
const {StatusCodes}=require('http-status-codes')
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const fs=require('fs');
const path = require('path');
const mime = require('mime');

async function createProfilePicture(req,res){
    try {
        const response=await PictureService.createProfilePicture({
            alumni_id:req.body.alumni_id,
            picture_data:req.body.picture_data,
        })
        SuccessResponse.data=response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
        
    } catch (error) {
     
      ErrorResponse.error = error;
      return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getPicture(req, res) {
    try {
        const picture = await PictureService.getPicture(req.params.id);
        // console.log(picture.picture_data);
        const fileExtension = path.extname(picture.picture_data);
        // console.log(fileExtension);
        const mimeType = mime.getType(fileExtension);
        fs.readFile(picture.picture_data, (err, data) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Internal Server Error');
            }
    
            const pictureData = {
                data: data.toString('base64'),
                contentType: mimeType,
              };
        
              res.send(pictureData);
          });
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
module.exports={
    createProfilePicture,
    getPicture,
}