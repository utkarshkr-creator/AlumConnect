const CrudRepository = require("./crud-repository");
const {Alumni}=require('../models');

const {Op}=require('sequelize')

class AlumniRepository extends CrudRepository{
    constructor() {
        super(Alumni);  
    }
    async getUserByEmail(email){
        const response=await Alumni.findOne({
            where:{
                email: {
                    [Op.eq]: email // Assuming 'data' contains the email value to match
                },
                
            }
        })
        if(!response){
            throw StatusCodes.NOT_FOUND;
        }
        return response;
    }

}
module.exports=AlumniRepository;