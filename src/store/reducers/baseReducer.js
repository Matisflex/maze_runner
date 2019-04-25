import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../util';

const initState = {
    gridSize: 6,
    grid: [
        [0,0,0,0,0,0], // 0 empty  1 start   2 end   3 wall   4 traveled
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ],
    editMode: false,
    currentLocation: null,
};

const updateCurrentLocation = (state, action) => {
   let currentLocation = {currentLocation:{...action.currentLocation}};
   return updateObject(state, currentLocation)
};


const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_CURRENT_LOCATION:
            console.log(state);
            return updateCurrentLocation(state, action);
        default:
            return state;
    }
};

export default reducer;