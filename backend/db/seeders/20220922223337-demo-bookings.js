'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-10-24",
        endDate: "2022-10-26",
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2022-11-25",
        endDate: "2022-11-28",
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2022-10-11",
        endDate: "2022-10-23",
      },
      {
        spotId: 2,
        userId: 4,
        startDate: "2022-10-17",
        endDate: "2022-10-19",
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    //const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Bookings', {
      spotId: [1, 2, 3]
    }, {});
  }
};
