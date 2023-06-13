'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { ServerConfig } = require('../config');
const {Enums}=require('../utils/common')
const {IT, ME, CE, EE,LT,PHARMA,BMR}=Enums.BRANCH_TYPE
module.exports = (sequelize, DataTypes) => {
  class Alumni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Alumni.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    phoneNumber:{
      type: DataTypes.STRING,
      allowNull:false, 
      unique:true,
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      allowNull:false, 
      
    },
    branch: {
      type: DataTypes.ENUM,
      values:[IT, ME, CE, EE,LT,PHARMA,BMR],
      allowNull:false, 
      
    },
    degreeCertificate:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    verified: {
      type:DataTypes.BOOLEAN,  
      defaultValue:false,
    }
  }, {
    sequelize,
    modelName: 'Alumni',
  });
  Alumni.beforeCreate(function encrypt(alumni) {
    const encryptedPassword = bcrypt.hashSync(alumni.password, +ServerConfig.SALT_ROUNDS);
    alumni.password = encryptedPassword;
  });
  return Alumni;
};