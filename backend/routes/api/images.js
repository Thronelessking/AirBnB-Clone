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
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            });
        } else {
            await reviewImage.destroy();
            res.json({
                message: 'Successful',
                statusCode: 400
            });
        }
    }
);

router.delete('/:spotImageId',
    requireAuth,
    async (req, res, next) => {
        //const review = await Review
        const spotImage = await Image.findOne(
            {
                where: { id: req.params.spotImageId }
            }
        );

        if (!spotImage) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            });
        } else {
            await spotImage.destroy();
            res.json({
                message: 'Successful',
                statusCode: 400
            });
        }
    }
);

module.exports = router;