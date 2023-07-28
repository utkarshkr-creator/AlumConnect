'use strict';
const {Enums}=require('../utils/common')
const {ACCEPT,PENDING,REJECT}=Enums.CONNECTION_STATUS
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConnectionMaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Alumnis',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Alumnis',
          key:'id'
        },
        onDelete: 'CASCADE',
      },
      connection_status: {
        type: Sequelize.STRING,
        allowNull:false,
        values:[ACCEPT,PENDING,REJECT],
        defaultValue:[PENDING],
        
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
    await queryInterface.dropTable('ConnectionMaps');
  }
};