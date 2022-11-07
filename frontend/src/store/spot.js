import { csrfFetch } from "./csrf";
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const ADD_OR_UPDATE_SPOT = 'spots/ADD_OR_UPDATE_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const CREATE_SPOT = 'spots/CREATE_SPOT';


// =========================
// ACTIONS
// =========================
const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
};

const addOneSpot = (spot) => ({
    type: ADD_OR_UPDATE_SPOT,
    spot
});

export const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
};

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}


export const spotById = (id) => (state) => {
    return state.Spots[id]
}


// ==============================
// DISPATCHES
// ==============================
//Get All Spots
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data.Spots));
        return data
    }
};

export const getSpotsBySearch = (maxLat, minLat, minLng, maxLng, minPrice, maxPrice) => async dispatch => {
    const response = await csrfFetch(`/api/spots?maxLat=${maxLat}&&minLat=${minLat}&&maxLng=${maxLng}&&minLng=${minLng}&&minPrice=${minPrice}&&maxPrice=${maxPrice}`);


    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data.Spots));
        return data
    }
};
//Get One Spot
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSpots(spot));
        return spot
    }
};
//Post New Spot = '/api/spots'
export const createNewSpot = (spot) => async dispatch => {
    // try {
    const response = await csrfFetch('/api/spots', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(spot),
    });

    const data = await response.json();
    dispatch(addOneSpot(data))

    if (response.ok) return data
    // console.log(response, "response")
    // return response;
};

// export const
// //Edit/Put a Spot = `/api/spots/${id}`
export const updateSpotById = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(spot),
    });

    const data = await response.json();
    dispatch(addOneSpot(data))
    return data;
};

// //Delete a Spot = `/api/spots/${id}`
export const deleteSpotById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    dispatch(deleteSpot(data.id))
    console.log(response)
    return response;
};



// ===================================
// REDUCER
// ===================================

const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_SPOTS: {
            action.spots.forEach((spot) => (newState[spot.id] = spot));
            return newState;
        };
        case ADD_OR_UPDATE_SPOT:
            newState[action.spot.id] = action.spot
            return newState
        case CREATE_SPOT:
            newState[action.spot.id] = action.spot
            return newState
        case DELETE_SPOT:
            // newState = { ...state };
            delete newState[action.id];
            return newState
        default:
            return state;
    }
};

export default spotReducer;