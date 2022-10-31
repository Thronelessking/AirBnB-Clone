import { csrfFetch } from "./csrf";
const GET_ALL_REVIEWS = 'reviews/getAllReviewsForSpot';
// const ADD_OR_UPDATE_REVIEW = 'reviews/ADD_OR_UPDATE_SPOT';

const loadReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
};

// const addOneReview = (review) => ({
//     type: ADD_OR_UPDATE_REVIEW,
//     review
// });

export const getAllReviewsForSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data.Reviews));
        // return data
    }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            action.reviews.forEach((review) => (newState[review.id] = review));
            return newState
        };
        default:
            return state;
    }
};

export default reviewsReducer;