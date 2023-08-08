import {createSlice} from '@reduxjs/toolkit';

const initialStatusState = {
  isLoading: false,
};

export const setLoading = bool => {
  return {type: 'setLoading', payload: bool};
};

export const StatusReducer = (state = initialStatusState, action) => {
    switch (action.type) {
        case "setLoading":
            return { isLoading: true }
        case "unsetLoading":
            return { isLoading: false }
        default:
            return state
    }
}