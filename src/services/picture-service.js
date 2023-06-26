
const {PictureRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes')

const pictureRepo=new PictureRepository();
async  function createProfilePicture(data){

    try {
        
        const picture=await pictureRepo.create(data);
        return picture;
    } catch (error) {
        throw error;
    }
}

async function updateProfilePicture(data){
    try {
        const res=await pictureRepo.update(data);
        return res;
    } catch (error) {
         
        throw new AppError("Something went wrong while updating profile Picture",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPicture(id) {
    try {
        const picture = await pictureRepo.getByAlumniId(id);
        return picture;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw error;
        // throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createProfilePicture,
    updateProfilePicture,
    getPicture,
}