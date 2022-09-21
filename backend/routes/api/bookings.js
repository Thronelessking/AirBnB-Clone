const express = require('express');
const { User, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//Get current bookings for current user
router.get('/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const allBookings = await Booking.findAll({ where: { userId } });
        // const owner = await User.findByPk(req.user.id);
        // const Bookings = await owner.getBookings()
        // res.json({ Bookings });
        res.json(allBookings)
    }
);

router.put('/:bookingId',
    requireAuth,
    async (req, res) => {
        const booking = await Booking.findOne({ where: { id: req.params.bookingId } });
        if (!booking) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {
            const {
                startDate,
                endDate
            } = req.body;
            const updateBooking = await booking.set({
                startDate,
                endDate
            });
            updateBooking.save();
            res.json(updateBooking)

        }
    }
);

router.delete('/:bookingId', requireAuth,

);

module.exports = router;