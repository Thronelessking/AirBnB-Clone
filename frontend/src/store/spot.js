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

export const deleteSpotById = (id) => {
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
//Get One Spot
export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(addOneSpot(spot));
        // return data
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
    dispatch(getOneSpot(data.id))
    console.log(response)
    return response;

    // if (!response.ok) {
    //     let error;
    //     if (response.status === 422) {
    //         error = await response.json();
    //         throw new Error(error.errors, response.statusText);
    //     } else {
    //         let errorJSON;
    //         error = await response.text();
    //         try {

    //             errorJSON = JSON.parse(error);
    //         } catch {
    //             throw new Error(error);
    //         }
    //         throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
    //     }
    // };


    // } catch (error) {
    //     throw new Error();
    // }
};
// export const
// //Edit/Put a Spot = `/api/spots/${id}`
// //Delete a Spot = `/api/spots/${id}`




// ===================================
// REDUCER
// ===================================

const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState = { ...state };
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
        case ADD_OR_UPDATE_SPOT:
            // action.spots.forEach((spot) => (newState[spot.id] = spot));
            // return newState;
            // if (!state[action.spot.id]) {
            //     newState = {
            //         [action.spot.id]: action.spot,
            //     }
            //     console.log("data:" + newState.spot)
            //     const spotList = newState.Spots.map((id) => newState[id]);
            //     spotList.push(action.spot);
            //     newState = spotList;
            //     return newState;
            // }
            return {
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot,
                },
            };
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