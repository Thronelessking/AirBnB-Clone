const express = require('express');
const router = express.Router();
const { User, Spot, Image, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

/*** 
** Get **
***/

//Get Spots of Current User
router.get('/current', requireAuth,
    async (req, res) => {
        //const owner = await User.findByPk(req.user.id);
        const userId = req.user.id;
        const allSpots = await Spot.findAll({ where: { userId } })
        res.json(allSpots);
    }
);

//Get All Bookings for a Spot Id
router.get('/:spotId/bookings',
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
            res.json(spot)
        }

    }
);

//Get Reviews by Spot Id
router.get('/:spotId/reviews',
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
            res.json(spot)
        }

    }
);

//Get Spot Details by Id
router.get('/:spotId',
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
            res.json(spot)
        }

    }
);

router.get('/',
    async (req, res, next) => {
        const allSpots = await Spot.findAll({
            include: {
                model: User
            },
            order: [['name', 'DESC']]
        })
        res.json(allSpots);
    }
);

/*** 
** Post **
***/
//Create a booking based on a spot id
router.post('/:spotId/bookings',
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
            res.json(spot)
        }

    }
);

router.post('/:spotId/images',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
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
            if (spot.userId !== userId) {
                const err = new Error('You are not authorized to add an image to this spot');
                err.status = 403
                res.json({
                    message: err.message,
                    code: err.status
                })
            } else {
                const image = await Image.create({
                    url,
                    imageableType: spotImage,
                    imageableId: spotId
                })
                res.json(image)
            }
        }


    }
);

router.post('/:spotId/reviews',
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
            res.json(spot)
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

        const spot = await owner.createSpot({ address, city, state, country, lat, lng, name, description, price });
        // //const Spot = [userId, address, city, state, country, lat, lng, name, description, price]
        res.json(Spot);

    }

);

/*** 
** Put **
***/
router.put('/:spotId',
    requireAuth,
    async (req, res) => {
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {

            // const newImage = await spot.createImage(req.body);
            // res.json(newImage)

        }
    }
);

/*** 
** Delete **
***/
router.delete('/:spotId',
    async (req, res) => {
        if (!spot) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {

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