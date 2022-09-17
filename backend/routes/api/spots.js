const express = require('express');
const router = express.Router();
const { User, Spot, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

/*** 
** Get **
***/

router.get('/',
    async (req, res, next) => {
        const allSpots = await Spot.findAll({ order: [['name', 'DESC']] })
        res.json(allSpots);
    }
);

//Get Spots of Current User
router.get('/current', requireAuth,
    async (req, res) => {
        //const owner = await User.findByPk(req.user.id);
        const userId = req.user.id
        const allSpots = await Spot.findAll({ where: { ownerId: userId } })
        res.json(allSpots);
    });

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

/*** 
** Post **
***/

router.post('/:spotId/images',
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

            const newImage = await spot.createImage(req.body);
            res.json(newImage)

        }


    }
);

router.post('/', requireAuth,
    async (req, res) => {

        const owner = await User.findByPk(req.user.id)

        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const newSpot = await owner.createSpot({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
        res.json({ newSpot });

    }

);

/*** 
** Put **
***/
router.put('/:spotId',
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