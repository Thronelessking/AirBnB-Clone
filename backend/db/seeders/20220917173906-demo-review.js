'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        content: "I really love this spot!",
        stars: 5,
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Reviews', {

    }, {});

  }
};
