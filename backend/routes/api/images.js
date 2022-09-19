const express = require('express');
const { Image } = require('../../db/models');

const router = express.Router();

router.get('/spots/:spotId');
router.get('/spots/current');
router.get('/spots',);


router.post('/spots/:spotId/images');
router.post('/spots/:spotId/reviews');

router.put('/spots/:spotId');

router.delete('/:reviewImageId', requireAuth,

);

router.delete('/:bookingImageId', requireAuth,

);

module.exports = router;