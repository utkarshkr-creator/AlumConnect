const {StatusCodes} = require('http-status-codes');
const {ConnectionMapRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');

const connectRepo=new ConnectionMapRepository();   

async function create(data){
     try {
        
      //   const response=await connectRepo.getByServerReceiverId(data.sender_id,data.receiver_id);
      //   if(response!=null){
      //     throw new AppError('Already Connected', StatusCodes.BAD_REQUEST);
      //   }
        const newConnection=await connectRepo.create(data);
        return newConnection;
        
     } catch (error) {
       
        if(error.name==='SequelizeUniqueConstraintError'){
         throw new AppError('Request is already sended for this id', StatusCodes.BAD_REQUEST);
        }
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

async function updateStatus(sender_id,receiver_id,data){
   try {
      console.log(data.connection_status);
      if(data.connection_status==='accepted')   
      {
         const response=await connectRepo.updateStatus(sender_id,receiver_id,data);
         return response;
      }
      else{
         const response=await connectRepo.destroyConnection(sender_id,receiver_id);
         return response;
      }
      
      
   } catch (error) {
      console.log(error);
      throw new AppError('Something went wrong while updating data', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function getByStatus(status,id){
   try {   
      // console.log(status);
      
      const response=await connectRepo.getByStatus(status,id);
      return response;
      
   } catch (error) {
      console.log(error);
      throw new AppError('Something went wrong while Geting data', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}


module.exports={
    create,
    getBySenderReceiverId,
    updateStatus,
    getByStatus,
}