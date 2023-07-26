const {StatusCodes} = require('http-status-codes');
const {ConnectionRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');

const connectRepo=new ConnectionRepository();   


async function create(data){
    try {
        // console.log(data);
        const response=await connectRepo.create(data);
        return response;
        
    } catch (error) {
        console.log(error);
        throw new AppError('Something went wrong while creating connection', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function get(id){
    try {
        const response=await connectRepo.get(id);
        return response;
        
    } catch (error) {
        throw new AppError('Something went wrong while fetching connection', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports={
    create,
    get,
}