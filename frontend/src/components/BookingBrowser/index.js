import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import { deleteBookingById, getAllBookingsForSpot, updateBooking } from "../../store/bookings";
import BookingDetail from "../BookingDetail";

import SpotDetail from '../SpotDetail'

import './BookingBrowser.css';

const BookingsList = ({ spotId }) => {
    const sessionUser = useSelector(state => state.session.user);

    const bookings = [];
    const dispatch = useDispatch();
    console.log(spotId, "from browser")
    // spotId = useSelector(state => state.spots[spotId]);
    const bookingsList = useSelector(state => {
        return state.bookings;
    });

    for (const key in bookingsList) {
        bookings.push(bookingsList[key])
    }

    useEffect(() => {
        dispatch(getAllBookingsForSpot(spotId))
    }, [dispatch]);

    // function parseDate(date) {
    //     date = new Date(date)
    //     date = date.toLocaleDateString([], {
    //         month: 'long',
    //         day: 'numeric',
    //         year: 'numeric'
    //     });
    //     return date
    // }

    // const deleteBooking = (e) => {
    //     e.preventDefault();

    //     dispatch(deleteBookingById(bookingId))

    // };

    // const editSpot = (e) => {
    //     e.preventDefault();

    //     dispatch(updateSpotById(spotId))

    //     history.push(`/spots/${spotId}`)
    // };



    return (
        <div className="bookings-container">
            <h2>Your Bookings For this Spot...</h2>
            {bookings
                .filter(booking => booking.userId === sessionUser.id)
                .map((booking) => (
                    <BookingDetail booking={booking} key={booking.id} spotId={spotId} />

                    // Route:"engines": {
                    //    "node": "16.18.0"
                    // }, **before main
                    //Frontend: change react-dom: ^17
                ))}
        </div>
    )
}

export default BookingsList;