import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  console.log('creating profile');
  axios
    .post('/api/profile', profileData)
    .then(result => history.push('/dashboard'))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
