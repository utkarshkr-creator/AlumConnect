'use strict';
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
      alumni_id_1: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Alumnis',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      alumni_id_2: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Alumnis',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      connection_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Connections',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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