
const {ProfileRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes')

const profileRepo=new ProfileRepository();
async  function createProfile(data){

    try {
        const picture=await profileRepo.create(data);
        return picture;
    } catch (error) {
        throw error;
    }
}

async function updateProfile(data){
    // console.log(data);
    try {
        const res=await profileRepo.update(data.id,data);
        return res;
    } catch (error) {
         
        throw new AppError("Something went wrong while updating profile Picture",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getProfile(id) {
    
    try {
        const profile = await profileRepo.getByAlumniId(id);
        return profile;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The Profile you requested is not present', error.statusCode);
        }
        throw error;
        // throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createProfile,
    updateProfile,
    getProfile,
}