'use strict';
const {
  Model
} = require('sequelize');

const {Enums}=require('../utils/common')
const {ACCEPT,PENDING,REJECT}=Enums.CONNECTION_STATUS

module.exports = (sequelize, DataTypes) => {
  class Connections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Alumni,{through:'ConnectionMap',foreignKey:'connection_id',as:'User'});
    }
  }
  Connections.init({
    status: {
      type:DataTypes.ENUM,
      values:[ACCEPT,PENDING,REJECT],
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Connections',
  });
  return Connections;
};