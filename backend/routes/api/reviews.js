const express = require('express');
const { Review } = require('../../db/models');

const router = express.Router();

router.get('/spots/:spotId');
router.get('/spots/current');
router.get('/spots');


router.post('/spots/:spotId/images');
router.post('/spots');

router.put('/spots/:spotId');

module.exports = router;