'use strict';
/** @type {import('sequelize-cli').Migration} */
const {Alumni}=require('../models/alumni');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alumni_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        reference:{
          module:'Alumnis',  
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      picture_data: {
        type: Sequelize.STRING,  
        allowNull:false
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
    await queryInterface.dropTable('pictures');
  }
};