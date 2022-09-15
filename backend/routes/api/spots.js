const express = require('express');

const router = express.Router();
const { Spot } = require('../../db/models')



router.get('/:spotId');
router.get('/current');
router.get('/',
    async (req, res, next) => {
        res.send('working')
    }
);


router.post('/');

router.put('/:spotId');

module.exports = router;