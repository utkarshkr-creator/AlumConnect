const CrudRepository = require("./crud-repository");
const {Connections}=require('../models');

class ConnectionRepository extends CrudRepository{
     constructor(){
         super(Connections)
     }
}


module.exports=ConnectionRepository;