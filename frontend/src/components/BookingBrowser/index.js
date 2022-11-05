import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useParams } from 'react-router-dom';
import { getAllBookingsForSpot } from "../../store/bookings";

import SpotDetail from '../SpotDetail'

import './BookingBrowser.css';

const BookingsList = ({ spotId }) => {
    const sessionUser = useSelector(state => state.session.user);

    const bookings = [];
    const dispatch = useDispatch();

    const bookingsList = useSelector(state => {
        return state.bookings;
    });

    for (const key in bookingsList) {
        bookings.push(bookingsList[key])
    }

    useEffect(() => {
        dispatch(getAllBookingsForSpot(spotId));
    }, [dispatch]);


    return (
        <div className="bookings-container">
            {bookings
                .filter(booking => booking.userId === sessionUser.id)
                .map((booking) => (
                    <div className="bookings">

                        <p>{booking.startDate}</p>
                        <p>this is the Spot Id {booking.spotId} and this is the user id {booking.userId}</p>
                    </div>
                ))}
        </div>
    )
}

export default BookingsList;