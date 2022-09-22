'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "12 Baller Avenue",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        previewImage: false,
      },
      {
        ownerId: 1,
        address: "9992 Liberty Street",
        city: "Derry",
        state: "New Hampshire",
        country: "United States of America",
        lat: 34.7645358,
        lng: -112.4730327,
        name: "Derry House",
        description: "Dreary Derry Baby",
        price: 234,
        previewImage: false,
      },
      {
        ownerId: 3,
        address: "7958 Magnolia Avenue",
        city: "Linden",
        state: "New Jersey",
        country: "United States of America",
        lat: 32.7645358,
        lng: -102.4730327,
        name: "What this is seed data",
        description: "Again this is seed data, grasping hairs",
        price: 456,
        previewImage: false,
      },
      {
        ownerId: 3,
        address: "aaa123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 567,
      },
      {
        ownerId: 2,
        address: "3452 Argyle Drive",
        city: "Vienna",
        state: "Virginia",
        country: "United States of America",
        lat: 77.7645358,
        lng: -128.4730327,
        name: "Also Budget House",
        description: "Dont go out at night but cheap residents",
        price: 54,
        previewImage: false,
      },
      {
        ownerId: 2,
        address: "194 Argyle Drive",
        city: "Vienna",
        state: "Virginia",
        country: "United States of America",
        lat: 56.7645358,
        lng: -25.4730327,
        name: "Budget House",
        description: "This is a shady area but the price is cheap",
        price: 32,
        previewImage: false,
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      onwerId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});

  }
};
