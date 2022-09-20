'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', [
      {
        url: "user2.jpg",
        imageableType: "User",
        imageableId: 2
      },
      {
        url: "review2.jpg",
        imageableType: "Review",
        imageableId: 2
      },
      {
        url: "spot2.jpg",
        imageableType: "Spot",
        imageableId: 2
      },
      {
        url: "spot1.jpg",
        imageableType: "Spot",
        imageableId: 1
      },
      {
        url: "userprofile1.jpg",
        imageableType: "User",
        imageableId: 1
      },
      {
        url: "review1.jpg",
        imageableType: "Review",
        imageableId: 1
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Images', {
      imageableId: { [Op.in]: [1, 2] }
    }, {});

  }
};
