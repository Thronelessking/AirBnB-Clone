'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 4,
        content: "I really love this spot!",
        stars: 5,
      },
      {
        userId: 4,
        spotId: 2,
        content: "I really hate this spot!",
        stars: 2,
      },
      {
        userId: 1,
        spotId: 3,
        content: "I really dont care this spot!",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 4,
        content: "I really liked this spot!",
        stars: 5,
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Reviews', {
      stars: { [Op.in]: [2, 3, 5] }
    }, {});

  }
};
