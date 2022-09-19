const express = require('express');
const { User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/spots/:spotId');

//Get current bookings for current user
router.get('/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const allBookings = await Booking.findAll({ where: { userId } })
        res.json(allBookings);
    }
);

router.put('/:bookingId', requireAuth,);

router.delete('/:bookingId', requireAuth,

);

module.exports = router;