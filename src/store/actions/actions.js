import * as actionTypes from './actionTypes';


export const updateCurrentLocation = (location) => {
  return {
      type: actionTypes.UPDATE_CURRENT_LOCATION,
      currentLocation: location
  }
};