'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alumni_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Alumnis',  
          key:'id',
        },
        // onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      picture_data: {
        type: Sequelize.STRING,  
        allowNull:true,   
        defaultValue:'pictures\\chris.jpg', 
      },  
      designation:{
        type:Sequelize.STRING,  
        allowNull:true,
      },
      location:{
        type:Sequelize.STRING,
        allowNull:true,  
      },
      linkdin_id:Sequelize.STRING,  
      twitter_id:Sequelize.STRING,  
      instragram_id:Sequelize.STRING,
      facebook_id:Sequelize.STRING,
      github_id:Sequelize.STRING, 

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
    await queryInterface.dropTable('profiles');
  }
};