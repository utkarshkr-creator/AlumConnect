const CrudRepository = require("./crud-repository");
const {ConnectionMap}=require('../models');
const {Op}=require('sequelize');

class ConnectionMapRepository extends CrudRepository{
    constructor(){
         super(ConnectionMap);
    }
    async getByServerReceiverId(senderId,receiverId){
            const response=await ConnectionMap.findOne({
                where:{
                    [Op.and]: [
                        { sender_id:senderId},
                        { receiver_id:receiverId }
                    ]
                }
             })
            return response;   
    }
}

module.exports=ConnectionMapRepository;