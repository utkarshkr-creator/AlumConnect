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
    const profile = await ProfileService.getProfile(req.params.id);
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
        location: profile.location,
        data: data.toString("base64"),
        designation: profile.designation,
        linkdin_id: profile.linkdin_id,
        twitter_id: profile.twitter_id,
        instragram_id: profile.instragram_id,
        facebook_id: profile.facebook_id,
        github_id: profile.github_id,
        contentType: mimeType,
      };

      res.send(profileData);
    });
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createProfile,
  getProfile,
};
