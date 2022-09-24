const express = require('express');
const router = express.Router();
const { User, Spot, Image, Review, Booking } = require('../../db/models');
// const booking = require('../../db/models/booking');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
// const sanitize = handleValidationErrors(['body', 'query']);


// const validateQuery = [
//     check('page')
//         .withMessage("Page must be greater than or equal to 0"),
//     check('size')
//         .withMessage("Size must be greater than or equal to 0"),
//     check('maxLat')
//         .withMessage("Maximum latitude is invalid"),
//     check('minLat')
//         .withMessage("Minimum latitude is invalid"),
//     check('maxLng')
//         .withMessage("Maximum longitude is invalid"),
//     check('minLng')
//         .withMessage("Minimum longitude is invalid"),
//     check('minPrice')
//         .withMessage("Minimum price must be greater than or equal to 0"),
//     check('maxPrice')
//         .withMessage("Maximum price must be greater than or equal to 0"),
// ];

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 49 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('review')
        .isString()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage("Stars must be an integer from 1 to 5"),
    check('stars', "Stars must be an integer from 1 to 5")
        .isInt({ min: 1, max: 5 }),
    handleValidationErrors
];

// const validateBooking = [
//     check('endDate', "endDate cannot be on or before startDate")
//         // .isBefore('startDate'),
//         .custom((value) => (new Date(value) <= new Date(startDate) ? true : endDate.isBefore(startDate))),
//     handleValidationErrors
// ];

const validateBooking = [
    check('endDate').toDate(),
    check('startDate').toDate().custom((startDate, { req }) => {
        const dateStart = new Date(startDate)
        const dateEnd = new Date(req.body.endDate)
        if (dateStart >= dateEnd) {
            throw new Error('endDate cannot be on or before startDate');
        }
        return true;
    }), handleValidationErrors
];


// const validateBooking = [
//     // check('endDate')
//     //     .toDate()
//     //     .isBefore(req.body.startDate)
//     //     .withMessage('endDate cannot be on or before startDate'),

//     // check('endDate')
//     //     .custom('endDate' === 'startDate')
//     //     .withMessage('endDate cannot be on or before startDate'),
//     // .trim()
//     //.exists({ checkFalsy: true })
//     // .custom(value => {
//     //     const dateStart = new Date(req.body.startDate)
//     //     const dateEnd = new Date(req.body.endDate)
//     //     if (dateStart >= dateEnd) {
//     //         throw new Error(
//     //             "endDate cannot be on or before startDate"
//     //         )
//     //     }
//     //     return true
//     // })

//     // handleValidationErrors

//     // check('endDate').custom((endDate, { req }) => {
//     //     const dateStart = new Date(startDate)
//     //     const dateEnd = new Date(endDate)

//     //     if (dateStart >= dateEnd) {
//     //         throw new Error(
//     //             "endDate cannot be on or before startDate"
//     //         )

//     //     }
//     // check('endDate').toDate(req.body.endDate),
//     // check('startDate').toDate().custom((startDate) => {
//     //     const dateStart = new Date(startDate)
//     //     const dateEnd = new Date(endDate)
//     //     if (dateStart >= dateEnd) {
//     //         throw new Error('start date must be before end date');
//     //     }
//     // }),
//     // handleValidationErrors
//     // })

//     check('endDate').toDate(),
//     check('startDate').toDate().custom((startDate, { req }) => {
//         const dateStart = new Date(startDate)
//         const dateEnd = new Date(req.body.endDate)
//         if (dateStart >= dateEnd) {
//             throw new Error('start date must be before end date');
//         }
//         return true;
//     }),
// ];
/*** 
** Get **
***/

//Get Spots of Current User
router.get('/current',
    requireAuth,
    async (req, res, next) => {
        const owner = await User.findByPk(req.user.id);
        const Spots = await owner.getSpots()
        res.json({ Spots });
    }
);

//Get All Bookings for a Spot Id
router.get('/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            next(err)
            // res.json({
            //     message: err.message,
            //     code: err.status
            // });
        } else {
            //const spot = await Spot.findByPk(req.params.spotId);
            Bookings = await spot.getBookings()
            res.json({ Bookings })
        }

    }
);

//Get Reviews by Spot Id
router.get('/:spotId/reviews',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.status(404).json({
                message: err.message,
                statusCode: err.status
            });
            // res.json({
            //     message: err.message,
            //     code: err.status
            // })
        } else {
            //const spot = await Spot.findByPk(req.params.spotId);
            Reviews = await spot.getReviews()
            res.json({ Reviews })
        }
    }
);

//Get Spot Details by Id
router.get('/:spotId',
    requireAuth,
    async (req, res, next) => {
        const spot = await Spot.findOne({
            where: { id: req.params.spotId },
            include: [
                {
                    model: Image,
                    as: "SpotImages"
                },
                {
                    model: User,
                    as: 'Owner'
                }
            ]
        }
        );
        //const owner = await spot.getUser();
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            next(err)
            // res.json({
            //     message: err.message,
            //     code: err.status
            // })
        } else {
            //const spot = await Spot.findByPk(req.params.spotId);
            res.json(spot);
        }

    }
);

router.get('/',
    requireAuth,
    async (req, res, next) => {
        let query = {
            where: {},
            include: [],
        };

        const {
            maxLat,
            minLat,
            minLng,
            maxLng,
            minPrice,
            maxPrice
        } = req.query;

        //let { page, size } = req.query;
        const page = req.query.page === undefined ? 0 : parseInt(req.query.page);
        const size = req.query.size === undefined ? 20 : parseInt(req.query.size);

        // if (!page || isNaN(page) || page <= 0) {
        //     page = 0;
        // }

        // if (!size || isNaN(size) || size <= 0) {
        //     size = 20;
        // }

        // if (size > 20) {
        //     size = 20;
        // }
        // if (page) {

        // } else if (size) {

        // } else {

        // }
        // page = Number(page);
        // size = Number(size);

        const Spots = await Spot.findAll({
            include: {
                model: User,
                as: 'Owner'
            },
            limit: size,
            offset: size * (page - 1),
        });

        return res.json({
            Spots,
            page,
            size,
        });
        //res.json(allSpots);
    }
);

/*** 
** Post **
***/
//Create a booking based on a spot id
router.post('/:spotId/bookings',
    requireAuth,
    validateBooking,
    async (req, res, next) => {
        const userId = req.user.id;
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId);
        // const { Op } = require("sequelize");
        const { startDate, endDate } = req.body;
        // const existingBooking = await Booking.findAll({
        //     where: {
        //         userId,
        //         spotId,
        //     }
        // });
        const allReadyBooked = await Booking.findAll({
            where: {
                //userId,
                spotId: spotId,
                startDate: {
                    [Op.between]: [startDate, endDate]
                },
                endDate: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        const bookedAtStart = await Booking.findAll({
            where: {
                // userId,
                spotId: spotId,
                startDate: {
                    [Op.gt]: startDate,
                    [Op.eq]: startDate,
                },
            }
        });
        const bookedAtEnd = await Booking.findAll({
            where: {
                userId,
                spotId: spotId,
                endDate: {
                    [Op.lte]: endDate
                }
            }
        });

        // spotId
        // userId
        // startDate
        // endDate
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.status(404).json({
                message: err.message,
                code: err.status
            });
            // } else if (existingBooking) {
            //     const err = new Error("User already has a booking for this spot");
            //     err.status = 403;
            //     res.status(403).json({
            //         message: err.message,
            //         code: err.status
            //     });
        } else if (allReadyBooked) {
            const errors = []
            if (bookedAtStart) {
                errors.push("Start date conflicts with an existing booking")
            }
            if (bookedAtEnd) {
                errors.push("End date conflicts with an existing booking")
            }
            const err = new Error("Sorry, this spot is already booked for the specified dates");
            err.errors = errors;
            //err.message = "Sorry, this spot is already booked for the specified dates"
            err.status = 403;
            res.status(403).json({
                message: err.message,
                statusCode: err.status,
                errors: errors
            });


        } else if (userId === spot.ownerId) {
            const err = new Error('Cannot book your your own listing/spot');
            err.status = 403
            res.status(403).json({
                message: err.message,
                code: err.status
            });
        } else {

            // const dateStart = new Date(startDate)
            // const dateEnd = new Date(endDate)
            // if (dateStart >= dateEnd) {
            //     const err = Error("Validation error");
            //     err.status = 400;
            //     err.title = "Validation error";
            //     next(err);
            // } else {

            const booking = await Book.create({
                spotId,
                userId,
                startDate,
                endDate
            })
            res.json(booking)

            //}

            // console.log(dateStart)
            // console.log(dateEnd)
            // console.log(dateEnd > dateStart)
        }

    }
);

router.post('/:spotId/images',
    requireAuth,
    async (req, res, next) => {
        const user = await User.findByPk(req.user.id);
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId)

        /*Image Table
        url
        imageableType
        imageableId
        */
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            return next(err);
        } else if (user.id !== spot.ownerId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            // console.log(spot.getOwner().id)
            // console.log("this a number" + user.id)

            // console.log(spot.ownerId)
            // console.log(req.user.id)
            const { url } = req.body;
            const image = await Image.create({
                url,
                imageableType: 'Spot',
                imageableId: spotId
            })
            res.json(image)

        }


    }
);

router.post('/:spotId/reviews',
    requireAuth,
    validateReview,
    async (req, res, next) => {
        const userId = req.user.id;
        const spotId = req.params.spotId

        const existingReview = await Review.findAll({
            where: {
                userId,
                spotId,
            }
        });

        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            const err = new Error("Spot couldn't be found");
            err.status = 404
            next(err)
            // res.json({
            //     message: err.message,
            //     code: err.status
            // })
        } else if (existingReview.length) {
            const err = new Error("User already has a review for this spot");
            err.status = 403;
            next(err)
            // res.json({
            //     message: err.message,
            //     code: err.status
            // });
        } else {
            const { review, stars } = req.body;
            const reviewSpot = await spot.createReview({
                userId,
                spotId,
                content: review,
                stars
            });
            res.json(reviewSpot)
        }

    }
);

router.post('/',
    requireAuth,
    validateSpot,
    async (req, res, next) => {
        const userId = req.user.id
        const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        } = req.body;
        //const owner = await User.findByPk(userId)
        //console.log(userId, owner.id)

        // if (!address) {
        //     const err = new Error("Validation Error");
        //     err.status = 400;
        //     err.errors = ['The provided credentials were invalid.'];
        //     return next(err);
        // } else if (!city) {
        //     const err = new Error("Validation Error");
        //     err.status = 400;
        //     err.errors = ['The provided credentials were invalid.'];
        //     return next(err);
        // } else if (!state) {
        // } else if (!country) {
        // } else if (!lat) {
        // } else if (!lng) {
        // } else if (!name) {
        // } else if (!description) {
        // } else if (!price) {
        // } else {
        const spot = await Spot.create({ ownerId: userId, address, city, state, country, lat, lng, name, description, price });
        // //const Spot = [userId, address, city, state, country, lat, lng, name, description, price]
        res.json(spot);
        //}

        //console.log(address, city, state, country, lat, lng, name, description, price)



    }

);

/*** 
** Put **
***/
router.put('/:spotId',
    requireAuth,
    async (req, res, next) => {
        const user = await User.findByPk(req.user.id);
        const spot = await Spot.findOne({ where: { id: req.params.spotId } });

        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.statusCode = 404
            res.status(404).json({
                message: err.message,
                status: err.statusCode
            })
        } else if (user.id !== spot.ownerId) {
            const err = new Error("Forbidden");
            // err.title = 'Unauthorized';
            // err.errors = ['Unauthorized'];
            err.status = 403;
            return next(err);
        } else {
            const {
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            } = req.body;
            const updateSpot = await spot.set({ address, city, state, country, lat, lng, name, description, price });;
            updateSpot.save();
            res.json(updateSpot)

        }
    }
);

/*** 
** Delete **
***/
router.delete('/:spotId',
    requireAuth,
    async (req, res, next) => {
        const user = await User.findByPk(req.user.id);
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            return next(err);
        } else if (user.id !== spot.ownerId) {
            const err = new Error("Forbidden");
            // err.title = 'Unauthorized';
            // err.errors = ['Unauthorized'];
            err.status = 403;
            return next(err);
        } else {
            await spot.destroy();
            return res.json({
                message: 'Successful',
                statusCode: 200
            });
        }
    }
);


module.exports = router;

// router.post(
//     '/',
//     async (req, res, next) => {
//         const { address, city, state, country, lat, lng, name, description, price } = req.body;

//         //Create a new spot but pass in the current user Id to connect to the spot, need to create static assoication
//         // const newSpot = await Spot.create(req.body);
//         const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price });
//         res.json({ newSpot });
//         // const owner = await User.findOne({ where: { name: "C.S Lewis" } });

//         //const book = await Book.create({ title: "Prince Caspian", authorId: author.id });
//     }

// );