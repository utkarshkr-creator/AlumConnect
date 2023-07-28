const {StatusCodes} = require('http-status-codes');
const {ConnectionMapRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');

const connectRepo=new ConnectionMapRepository();   

async function create(data){
     try {
        
        const response=await connectRepo.getByServerReceiverId(data.sender_id,data.receiver_id);
        if(response!=null){
          throw new AppError('Already Connected', StatusCodes.BAD_REQUEST);
        }
        const newConnection=await connectRepo.create(data);
        return newConnection;
        
     } catch (error) {
        
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while creating connection', StatusCodes.INTERNAL_SERVER_ERROR);
     }
}

async function getBySenderReceiverId(id){ 
      try {
         
         const response=await connectRepo.getByServerReceiverId(id.senderId,id.receiverId);
         return response;
         
      } catch (error) {
         console.log(error);
         throw new AppError('Something went wrong while fetching data', StatusCodes.INTERNAL_SERVER_ERROR);
      }

}


module.exports={
    create,
    getBySenderReceiverId,
}