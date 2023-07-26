'use strict';
const {
  Model
} = require('sequelize');
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
    alumni_id_1: {
      type:DataTypes.INTEGER,
      allowNull:false
      
    },
    alumni_id_2:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    connection_id: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'ConnectionMap',
  });
  return ConnectionMap;
};