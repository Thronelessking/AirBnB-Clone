const express = require('express');
const { Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/current', requireAuth,
    async (req, res) => {

    }
);
router.get('/:reviewId');



router.post('/:reviewId/images',
    async (req, res) => {

    }
);

router.post('/spots');

router.put('/:reviewId');

module.exports = router;