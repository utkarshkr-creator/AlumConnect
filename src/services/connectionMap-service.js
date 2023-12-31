const {StatusCodes} = require('http-status-codes');
const {ConnectionMapRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {Enums}=require('../utils/common')
const {ACCEPT,PENDING,REJECT}=Enums.CONNECTION_STATUS
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
       console.log(error);
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
      // console.log(data.connection_status);
      
      if(data.connection_status==='accepted')   
      {
         await connectRepo.updateStatus(sender_id,receiver_id,data);
         const newConnection=await connectRepo.create({
            sender_id: receiver_id,
            receiver_id: sender_id,
            connection_status: data.connection_status,});
         return true;
      }
      else{
         await connectRepo.destroyConnection(sender_id,receiver_id);
         await connectRepo.destroyConnection(receiver_id,sender_id);
         return true;
      }
      
      
   } catch (error) {
      console.log(error);
      throw new AppError('Something went wrong while updating data', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function getByStatus(status,id){
   try {   
      if(status==ACCEPT)
      {
         const response=await connectRepo.getAcceptedList(status,id);
         return response;
      }
      else{
         const response=await connectRepo.getPendingReq(status,id);
         return response;
      }
      
      
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