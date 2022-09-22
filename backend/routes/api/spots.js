const express = require('express');
const router = express.Router();
const { User, Spot, Image, Review, Booking } = require('../../db/models');
// const booking = require('../../db/models/booking');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true }),
    handleValidationErrors
];
/*** 
** Get **
***/

//Get Spots of Current User
router.get('/current', requireAuth,
    async (req, res) => {
        const owner = await User.findByPk(req.user.id);
        const Spots = await owner.getSpots()
        res.json({ Spots });
    }
);

//Get All Bookings for a Spot Id
router.get('/:spotId/bookings',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            });
        } else {
            //const spot = await Spot.findByPk(req.params.spotId);
            res.json(spot)
        }

    }
);

//Get Reviews by Spot Id
router.get('/:spotId/reviews',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {
            //const spot = await Spot.findByPk(req.params.spotId);
            allReviews = await spot.getReviews()
            res.json(allReviews)
        }
    }
);

//Get Spot Details by Id
router.get('/:spotId',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findOne({
            where: { id: req.params.spotId },
            include: [
                {
                    model: Image,
                    // as: "SpotImages"
                },
                {
                    model: User,
                    // as: 'Owner'
                }
            ]
        }
        );
        const owner = await spot.getUser();
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
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

        if (!page || isNaN(page) || page <= 0) {
            page = 0;
        }

        if (!size || isNaN(size) || size <= 0) {
            size = 20;
        }

        if (size > 20) {
            size = 20;
        }
        if (page) {

        } else if (size) {

        } else {

        }
        page = Number(page);
        size = Number(size);

        const Spots = await Spot.findAll({
            include: {
                model: User,
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
    async (req, res) => {
        const userId = req.user.id;
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId);

        const existingBooking = await Booking.findAll({
            where: {
                userId,
                spotId,
            }
        });
        // spotId
        // userId
        // startDate
        // endDate
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            });
        } else if (existingBooking) {
            const err = new Error("User already has a booking for this spot");
            err.status = 403;
            res.json({
                message: err.message,
                code: err.status
            });
        } else {
            const { startDate, endDate } = req.body;
            const booking = await spot.createBooking({
                spotId,
                userId,
                startDate,
                endDate
            })
            res.json(booking)
        }

    }
);

router.post('/:spotId/images',
    requireAuth,
    async (req, res) => {
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
            res.json({
                message: err.message,
                code: err.status
            })
        } else {

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
            res.json({
                message: err.message,
                code: err.status
            })
        } else if (existingReview.length) {
            const err = new Error("User already has a review for this spot");
            err.status = 403;
            res.json({
                message: err.message,
                code: err.status
            });
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

router.post('/', requireAuth,
    async (req, res) => {
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
        const owner = await User.findByPk(userId)
        //console.log(userId, owner.id)


        //console.log(address, city, state, country, lat, lng, name, description, price)

        const spot = await owner.createSpot({ ownerId: userId, address, city, state, country, lat, lng, name, description, price });
        // //const Spot = [userId, address, city, state, country, lat, lng, name, description, price]
        res.json(spot);

    }

);

/*** 
** Put **
***/
router.put('/:spotId',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const spot = await Spot.findOne({ where: { id: req.params.spotId } });
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
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
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {
            await spot.destroy();
            res.json({
                message: 'Successful',
                statusCode: 400
            });
        }
    }
);


module.exports = router;

// router.post(
//     '/',
//     async (req, res) => {
//         const { address, city, state, country, lat, lng, name, description, price } = req.body;

//         //Create a new spot but pass in the current user Id to connect to the spot, need to create static assoication
//         // const newSpot = await Spot.create(req.body);
//         const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price });
//         res.json({ newSpot });
//         // const owner = await User.findOne({ where: { name: "C.S Lewis" } });

//         //const book = await Book.create({ title: "Prince Caspian", authorId: author.id });
//     }

// );