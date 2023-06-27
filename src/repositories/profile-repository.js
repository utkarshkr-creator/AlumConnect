const CrudRepository = require("./crud-repository");
const {profile}=require('../models')

class ProfileRepository extends CrudRepository{
    constructor(){
        super(profile);
    }
    async getByAlumniId(id){
        const response=await profile.findOne({
            where:{
                alumni_id:id  
            }
        })
        if(!response){
            throw StatusCodes.NOT_FOUND;
        }
        return response;
    }
}


module.exports=ProfileRepository;