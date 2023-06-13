'use strict';
const { Op } = require('sequelize');
const {Enums}=require('../utils/common')
const {IT, ME, CE, EE,LT,PHARMA,BMR}=Enums.BRANCH_TYPE
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Alumnis', [
      {
        name: 'Vaibhavi',
        email: 'vai',
        password:'1234',
        phoneNumber:434343,
        graduationYear:348373,
        branch:IT,
        degreeCertificate:'fdgd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ramesh',
        email: 'Ram',
        phoneNumber:64443,
        graduationYear:34373,
        password:'1234',
        branch:IT,
        degreeCertificate:'f787dgd',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'Alumnis', 
      {
        [Op.or]: [
          {email: 'vai'}, 
          {email: 'Ram',}
        ]
      });
  }
};
