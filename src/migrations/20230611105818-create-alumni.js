'use strict';
const {Enums}=require('../utils/common')
const {IT, ME, CE, EE,LT,PHARMA,BMR}=Enums.BRANCH_TYPE
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alumnis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,  
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 50]
        }
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      graduationYear: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      branch: {
        type: Sequelize.ENUM,
        values:[IT, ME, CE, EE,LT,PHARMA,BMR],
        allowNull:false,
      },
      degreeCertificate: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Alumnis');
  }
};