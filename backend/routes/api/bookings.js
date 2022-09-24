const express = require('express');
const router = express.Router();
const { Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// const validateBooking = [
//     check('endDate')
//         //.exists({ checkFalsy: true })
//         .custom((endDate, { req }) => {

//             if (startDate >= endDate) {
//                 throw new Error(
//                     "endDate cannot be on or before startDate"
//                 )
//             }
//             return true
//         })

//     //handleValidationErrors
// ];

const validateBooking = [
    check('endDate', "endDate cannot be on or before startDate")
        .isBefore('startDate'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isString()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt()
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


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
        const userId = req.user.id;
        const booking = await Booking.findOne({ where: { id: req.params.bookingId } });
        const { Op } = require("sequelize");
        const passedEnd = await Booking.findAll({
            where: {

                spotId: spotId,

                endDate: {
                    [Op.gte]: endDate
                }
            }
        });

        if (!booking) {
            const err = new Error('The specified spot does not exist');
            err.status = 404
            res.json({
                message: err.message,
                code: err.status
            })
        } else if (userId !== booking.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if (passedEnd) {
            const err = new Error("Past bookings can't be modified");
            err.status = 403;
            res.status(403).json({
                message: err.message,
                statusCode: err.status
            })
        }
        else {
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
        const userId = req.user.id;
        const booking = await Booking.findByPk(req.params.bookingId);
        const bookingId = req.params.bookingId;
        const { Op } = require("sequelize");
        const currentlyBooked = await Booking.findAll({
            where: {
                id: bookingId,
                userId,
                spotId,
                startDate: {
                    [Op.between]: [startDate, endDate]
                },
                endDate: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });

        if (!booking) {
            const err = new Error("Booking couldn't be found");
            err.status = 404
            res.status(404).json({
                message: err.message,
                code: err.status
            })
        } else if (userId !== booking.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if (currentlyBooked) {
            const err = new Error("Bookings that have been started can't be deleted");
            err.status = 403;
            res.status(403).json({
                message: err.message,
                statusCode: err.status
            })
        } else {
            await booking.destroy();
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            });
        }
    }
);

module.exports = router;