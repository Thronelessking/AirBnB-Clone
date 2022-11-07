// delete `/api/bookings/${bookingId}`
// put `/api/bookings/${bookingId}`
// post `/api/${spotId}/bookings`
// get `/:spotId/bookings`

import { csrfFetch } from "./csrf";

const GET_ALL_BOOKINGS = 'bookings/GET_ALL_BOOKINGS';
const ADD_OR_UPDATE_BOOKING = 'bookings/ADD_OR_UPDATE_BOOKING';
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

const loadBookings = (bookings) => {
    return {
        type: GET_ALL_BOOKINGS,
        bookings
    }
}

const addBooking = (booking) => {
    return {
        type: ADD_OR_UPDATE_BOOKING,
        booking
    }
}

const deleteBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    }
}


export const getAllBookingsForSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBookings(data.Bookings));
        // return data
    }
};

export const getOneBooking = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`);

    if (response.ok) {
        const booking = await response.json();
        dispatch(addBooking(booking));
        return response
    }
};

export const getAllBookingsForCurrentUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${userId}/bookings`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadBookings(data.Bookings));
        // return data
    }
};

export const createNewBooking = (booking, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
    });

    const data = await response.json();
    dispatch(addBooking(data))
    if (response.ok) return data
    // return response;
};

export const updateBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingId),
    });

    const booking = await response.json();
    dispatch(addBooking(booking))
    return response;
}

export const deleteBookingById = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    dispatch(deleteBooking(data.id))
    return response;
}

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_BOOKINGS:
            action.bookings.forEach((booking) => (newState[booking.id] = booking));
            return newState;
        case ADD_OR_UPDATE_BOOKING:
            newState[action.booking.id] = action.booking
            return newState;
        case DELETE_BOOKING:
            delete newState[action.id]
            return newState;
        default:
            return state;
    }
}

export default bookingsReducer;