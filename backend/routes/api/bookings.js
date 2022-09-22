const express = require('express');
const router = express.Router();
const { Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');



//Get current bookings for current user
router.get('/current',
    requireAuth,
    async (req, res, next) => {
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
    async (req, res, next) => {
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

router.delete('/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const booking = await Booking.findByPk(req.params.bookingId);
        if (!booking) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else {
            await booking.destroy();
            res.json({
                message: 'Successful',
                statusCode: 400
            });
        }
    }
);

module.exports = router;