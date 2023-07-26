const CrudRepository = require("./crud-repository");
const {ConnectionMap}=require('../models');

class ConnectionMapRepository extends CrudRepository{
    constructor(){
         super(ConnectionMap);
    }
}

module.exports=ConnectionMapRepository;