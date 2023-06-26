const CrudRepository = require("./crud-repository");
const {picture}=require('../models')

class PictureRepository extends CrudRepository{
    constructor(){
        super(picture);
    }
    async getByAlumniId(id){
        const response=await picture.findOne({
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


module.exports=PictureRepository;