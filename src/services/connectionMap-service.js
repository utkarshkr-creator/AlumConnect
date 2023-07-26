const {StatusCodes} = require('http-status-codes');
const {ConnectionMapRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');

const connectRepo=new ConnectionMapRepository();   

async function create(data){
     try {

        const newConnection=await connectRepo.create(data);
        return newConnection;
        
     } catch (error) {
        console.log(error);
        throw new AppError('Something went wrong while creating connection', StatusCodes.INTERNAL_SERVER_ERROR);
     }
}


module.exports={
    create,
}