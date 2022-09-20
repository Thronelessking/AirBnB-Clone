'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
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
      {
        userId: 3,
        spotId: 5,
        content: "I really hated this spot!",
        stars: 5,
      },
      {
        userId: 5,
        spotId: 6,
        content: "I really love and hate this spot!",
        stars: 2,
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});

  }
};
