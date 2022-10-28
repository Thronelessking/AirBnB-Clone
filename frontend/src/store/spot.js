import { csrfFetch } from "./csrf";
const GET_ALL_SPOTS = 'spots/getAllSpots';
const ADD_OR_UPDATE_SPOT = 'spot/ADD_OR_UPDATE_SPOT';
// const DELETE_SPOT = 'spot/DELETE_SPOT';

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

//Get All Spots
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

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
        dispatch(addOneSpot(spot));
        // return data
    }
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_SPOTS: {
            // const allSpots = action.spots.Spots
            // console.log(action.spots.Spots)
            action.spots.forEach((spot) => (newState[spot.id] = spot));
            return newState;
            // const allSpots = {};
            // action.spots.forEach((spot) => {
            //     allSpots[spot.id] = spot;
            // });
            // return {
            //     ...allSpots,
            //     ...state,
            // }
        };
        case ADD_OR_UPDATE_SPOT: {
            // action.spots.forEach((spot) => (newState[spot.id] = spot));
            // return newState;
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot,
                },
            }
        };
        default:
            return state;
    }
};

export default spotReducer;