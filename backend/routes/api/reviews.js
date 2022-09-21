const express = require('express');
const { Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const allReviews = await Review.findAll({ where: { userId } })
        res.json(allReviews);
    }
);

router.get('/:reviewId',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
    }
);

router.post('/:reviewId/images',
    requireAuth,
    async (req, res) => {
        //beginning of async
        const userId = req.user.id
        const reviewId = req.params.reviewId
        const review = await Review.findByPk(reviewId)

        /*Image Table
        url
        imageableType
        imageableId
        */

        if (!review) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            });
        } else if (spot.ownerId !== userId) {
            const err = new Error('You are not authorized to add an image to this spot');
            err.status = 403
            res.json({
                message: err.message,
                code: err.status
            })
        } else {
            const { url } = req.body;
            const image = await Image.create({
                url,
                imageableType: 'Review',
                imageableId: spotId
            })
            res.json(image)
        }
        //end of async
    }
);

router.put('/:reviewId',
    requireAuth,
    async (req, res) => {

    }
);

router.delete('/:reviewId', requireAuth,

);

module.exports = router;