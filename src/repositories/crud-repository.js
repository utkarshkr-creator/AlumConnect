const {StatusCodes}=require('http-status-codes');
class CrudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
        const response=await this.model.create(data);
        return response;
    }
    async destroy(data){
        const response=await this.model.destroy({
            where:{
                id:data
            }
        });
        if(!response){
            throw StatusCodes.NOT_FOUND;
        }
        return response;
    }
    async get(data){
        const response=await this.model.findByPk(data);
        if(!response){
            throw StatusCodes.NOT_FOUND;
        }
        return response;
    }
    async getAll(){
        const response=await this.model.findAll();
        if(!response){
            throw StatusCodes.NOT_FOUND;
        }
        return response;
    }
    async update(id, data) { // data -> {col: value, ....}
        // console.log(id,data);
        const response = await this.model.update(data, {
            where: {
                id: id.id
            }
        })
        // console.log(response);
        return response;
    }
}
module.exports=CrudRepository;