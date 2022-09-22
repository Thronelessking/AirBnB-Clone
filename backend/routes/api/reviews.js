const express = require('express');
const { User, Spot, Image, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current',
    requireAuth,
    async (req, res) => {
        const owner = await User.findByPk(req.user.id);
        const allReviews = await owner.getReviews()
        res.json({ allReviews });
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

        const reviewId = req.params.reviewId
        const reviewContent = await Review.findByPk(reviewId)

        if (!reviewContent) {
            const err = new Error("Review couldn't be found");
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            });
            // } else if (spot.ownerId !== userId) {
            //     const err = new Error('You are not authorized to add an image to this spot');
            //     err.status = 403
            //     res.json({
            //         message: err.message,
            //         code: err.status
            //     })
        } else {
            const { url } = req.body;
            const reviewImage = await Image.create({
                url,
                imageableType: 'Review',
                imageableId: reviewId
            })
            res.json(reviewImage)
        }
        //end of async
    }
);

router.put('/:reviewId',
    requireAuth,
    async (req, res) => {
        const reviewContent = await Review.findByPk(req.params.reviewId);
        if (!reviewContent) {
            const err = new Error("Review couldn't be found");
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {
            const {
                review,
                stars
            } = req.body;
            const updateReview = await reviewContent.set({
                content: review,
                stars
            });
            updateReview.save();
            res.json(updateReview)

        }
    }
);

router.delete('/:reviewId',
    requireAuth,
    async (req, res) => {
        const review = await Review.findByPk(req.params.reviewId);
        if (!review) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {
            await review.destroy();
            res.json({
                message: 'Successful',
                statusCode: 400
            });
        }
    }
);

module.exports = router;