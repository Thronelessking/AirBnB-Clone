'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', [
      {
        url: "spot1.jpg",
        imageableType: "Review",
        imageableId: ""
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Images', {

    }, {});

  }
};
