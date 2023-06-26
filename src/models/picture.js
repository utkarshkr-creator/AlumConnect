"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      picture.belongsTo(models.Alumni, { foreignKey: "id" });
    }
  }
  picture.init(
    {
      alumni_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Alumni',
          key: 'id',
        },
      },
      picture_data: {
        type: DataTypes.STRING,
        allowNull:false,   
      },
    },
    {
      sequelize,
      modelName: "picture",
    }
  );
  return picture;
};
