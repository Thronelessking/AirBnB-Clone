import { csrfFetch } from "./csrf";
const GET_ALL_REVIEWS = 'reviews/getAllReviewsForSpot';
const ADD_OR_UPDATE_REVIEW = 'reviews/ADD_OR_UPDATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const loadReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
};

const addReview = (review) => {
    return {
        type: ADD_OR_UPDATE_REVIEW,
        review
    }
};

const deleteReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

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

export const createNewReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });

    const data = await response.json();
    dispatch(addReview(data))
    if (response.ok) return data
    return response;
};

export const updateReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewId),
    });

    const review = await response.json();
    // dispatch(addOneSpot(review))
    return review;
};

export const deleteReviewById = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    dispatch(deleteReview(data.id))
    return response;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_REVIEWS:
            action.reviews.forEach((review) => (newState[review.id] = review));
            return newState;
        case ADD_OR_UPDATE_REVIEW:
            newState[action.review.id] = action.review
            return newState;
        case DELETE_REVIEW:
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default reviewsReducer;