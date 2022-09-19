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
    async (req, res) => {

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