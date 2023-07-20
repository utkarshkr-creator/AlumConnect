const { ProfileService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

async function createProfile(req, res) {
  try {
    const response = await ProfileService.createProfile({
      alumni_id: req.body.alumni_id,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getProfile(req, res) {
  try {
    console.log(req.query);
    const profile = await ProfileService.getProfile(req.query.id);
    // console.log(picture.picture_data);
    const fileExtension = path.extname(profile.picture_data);
    // console.log(fileExtension);
    const mimeType = mime.getType(fileExtension);
    fs.readFile(profile.picture_data, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      const profileData = {
        id: profile.id,
        data: data.toString("base64"),
        location: profile.location,
        designation: profile.designation,
        contentType: mimeType,
      };
      console.log(req.query)
      if (req.query.auth==='true') {
        profileData.linkdin_id = profile.linkdin_id;
        profileData.twitter_id = profile.twitter_id;
        profileData.instragram_id = profile.instragram_id;
        profileData.facebook_id = profile.facebook_id;
        profileData.github_id = profile.github_id;
      }
      

      res.send(profileData);
    });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateProfile(req, res) {
  try { 
    // console.log(req);
    const existingData=await ProfileService.getProfile(req.params.id);
    await ProfileService.updateProfile({
      id:req.body.id,  
      picture_data:req.file?`pictures\\${req.file.filename}`:existingData.picture_data,
      designation:req.body.designation,
      location:req.body.location,
      linkdin_id:req.body.linkdin_id,  
      twitter_id:req.body.twitter_id,  
      instragram_id:req.body.instragram_id,
      facebook_id:req.body.facebook_id,
      github_id:req.body.github_id, 
    });
    SuccessResponse.data =`udated ${req.params.id}`;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};
