import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import { deleteBookingById, getAllBookingsForSpot, updateBooking } from "../../store/bookings";

import './BookingDetail.css';

const BookingDetail = ({ spotId, booking }) => {
    // const sessionUser = useSelector(state => state.session.user);

    // const bookings = [];
    const dispatch = useDispatch();
    // spotId = useSelector(state => state.spots[spotId]);
    // useEffect(() => {
    //     dispatch(getAllBookingsForSpot())
    // }, [dispatch]);

    function parseDate(date) {
        date = new Date(date)
        date = date.toLocaleDateString([], {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        return date
    }
    const deleteBooking = (e) => {
        e.preventDefault();

        dispatch(deleteBookingById(booking.id))

    };

    return (
        <div className="bookings" key={booking?.id}>

            <h3>You are booked from <span>{parseDate(booking.startDate)}</span> to <span>{parseDate(booking.endDate)}</span></h3>

            {/* <button
                type="submit"
                onClick={() => dispatch(updateBooking(booking.id))}
                className="edit"
            >Edit Spot</button> */}
            <Link to={`/bookings/${booking.id}/edit`}>Edit Booking</Link>
            <button
                type='submit'
                onClick={(deleteBooking)}
                className="delete"
            >Delete Spot</button>
        </div>
    )

}

export default BookingDetail;