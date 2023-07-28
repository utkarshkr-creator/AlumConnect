const CrudRepository = require("./crud-repository");
const {profile}=require('../models')
const { StatusCodes } = require('http-status-codes');

class ProfileRepository extends CrudRepository{
    constructor(){
        super(profile);
    }
    async getUserByAlumniId(id){
        // console.log(id);
        const response=await profile.findOne({
            where:{
                alumni_id:id
                
            }
        })
        // console.log("response", response);
        if(!response){

            throw StatusCodes.NOT_FOUND;
        }
        return response;
    }
}


module.exports=ProfileRepository;