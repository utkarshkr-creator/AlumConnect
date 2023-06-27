"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      profile.belongsTo(models.Alumni, { foreignKey: "id" });
    }
  }
  profile.init(
    {
      alumni_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        references: {
          model: 'Alumni',
          key: 'id',
        },
      },
      picture_data: {
        type: DataTypes.STRING,
        allowNull:true, 
        defaultValue:'pictures\\chris.jpg'  
      },
      designation:{
        type:DataTypes.STRING,  
        allowNull:true,
      },
      location:{
        type:DataTypes.STRING,
        allowNull:true,  
      },
      linkdin_id:DataTypes.STRING,  
      twitter_id:DataTypes.STRING,  
      instragram_id:DataTypes.STRING,
      facebook_id:DataTypes.STRING,
      github_id:DataTypes.STRING,    

    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
