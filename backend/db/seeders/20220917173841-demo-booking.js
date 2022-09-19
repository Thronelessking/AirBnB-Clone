'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Booking', [
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-10-24",
        endDate: "2022-10-26",
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Booking', {

    }, {});
  }
};
