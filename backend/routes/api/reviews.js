const express = require('express');
const router = express.Router();
const { User, Spot, Image, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
router.get('/current',
    requireAuth,
    async (req, res) => {
        const owner = await User.findByPk(req.user.id);
        // const Reviews = await owner.getReviews()
        // res.json({ Reviews });
        const Reviews = await Review.findAll({
            where: { userId: owner.id },
            include: [
                {
                    model: User
                },
                {
                    model: Spot
                },
                {
                    model: Image,
                    as: "ReviewImages"
                },
            ]
        });

        return res.json({
            Reviews
        });
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
    async (req, res, next) => {
        //beginning of async
        const userId = req.user.id;
        const reviewId = req.params.reviewId
        const reviewContent = await Review.findByPk(reviewId)

        const imageCounter = await Image.count({
            where: {
                imageableId: 6
            }
        })
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
        } else if (userId !== reviewContent.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if (imageCounter >= 10) {
            const err = new Error("Maximum number of images for this resource was reached");
            err.status = 403
            res.status(403).json({
                message: err.message,
                statusCode: err.status
            })
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
    validateReview,
    async (req, res, next) => {
        const userId = req.user.id;
        const reviewContent = await Review.findByPk(req.params.reviewId);
        if (!reviewContent) {
            const err = new Error("Review couldn't be found");
            err.status = 404
            res.status(404).json({
                message: err.message,
                statusCode: err.status
            })
        } else if (userId !== reviewContent.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
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
    async (req, res, next) => {
        const userId = req.user.id;
        const review = await Review.findByPk(req.params.reviewId);
        if (!review) {
            const err = new Error("Review couldn't be found");
            err.status = 404
            // res.json({
            //     message: err.message,
            //     code: err.status
            // })
            return next(err);
        } else if (userId !== review.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            await review.destroy();
            res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
);

module.exports = router;