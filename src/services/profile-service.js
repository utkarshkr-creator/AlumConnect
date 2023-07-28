
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

async function getProfileAlumniId(id) {
    
    try {
        // console.log("inside service")
        const profile = await profileRepo.getUserByAlumniId(id);
        return profile;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUN || error===404) {
            throw new AppError('The Profile you requested is not present', StatusCodes.NOT_FOUND);
        }
        // throw error;
        throw new AppError('Cannot fetch data of the Profile', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getProfile(id) {
    
    try {
        // console.log("inside service")
        const profile = await profileRepo.get(id);
        return profile;
    } catch(error) {
        if(error.statusCode == StatusCodes.NOT_FOUN || error===404) {
            throw new AppError('The Profile you requested is not present', StatusCodes.NOT_FOUND);
        }
        // throw error;
        throw new AppError('Cannot fetch data of the Profile', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createProfile,
    updateProfile,
    getProfile,
    getProfileAlumniId,
}