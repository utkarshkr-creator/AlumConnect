'use strict';
const {
  Model
} = require('sequelize');
const {Enums}=require('../utils/common')
const {ACCEPT,PENDING,REJECT}=Enums.CONNECTION_STATUS
module.exports = (sequelize, DataTypes) => {
  class ConnectionMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  ConnectionMap.init({
    sender_id: {
      type:DataTypes.INTEGER,
      allowNull:false
      
    },
    receiver_id:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    connection_status: {
      type:DataTypes.STRING,
      allowNull:false,
      values:[ACCEPT,PENDING,REJECT],
      defaultValue:[PENDING],
    }
  }, {
    sequelize,
    modelName: 'ConnectionMap',
  });
  return ConnectionMap;
};