"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const { ADMIN, CUSTOMER } = Enums.USER_ROLES_ENUMS;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Alumni, {through: 'User_Roles',foreignKey:'roleId', as: 'user'});
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM,
        values: [ADMIN, CUSTOMER],
        defaultValue: CUSTOMER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
