const express = require('express');
const { Spot, Image, Review, } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// router.get('/spots/:spotId');
// router.get('/spots/current');
// router.get('/spots',);


// router.post('/spots/:spotId/images');
// router.post('/spots/:spotId/reviews');

// router.put('/spots/:spotId');

router.delete('/:reviewImageId',
    requireAuth,
    async (req, res, next) => {
        //const review = await Review
        const reviewImage = await Image.findOne(
            {
                where: { id: req.params.reviewImageId }
            }
        );

        if (!reviewImage) {
            const err = new Error("Review Image couldn't be found");
            err.status = 404
            res.status(404).json({
                message: err.message,
                code: err.status
            });
        } else {
            await reviewImage.destroy();
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
);

router.delete('/:spotImageId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        //const review = await Review
        const spotImage = await Image.findOne(
            {
                where: { id: req.params.spotImageId }
            }
        );
        const spot = await Spot.findByPk(spotImage.spotId)

        if (!spotImage) {
            const err = new Error("Spot Image couldn't be found");
            err.status = 404
            res.status(404).json({
                message: err.message,
                code: err.status
            });
        } else if (userId !== spot.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            await spotImage.destroy();
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
);

module.exports = router;