import {createSlice} from '@reduxjs/toolkit';

const initialStatusState = {
  isLoading: false,
};

export const setLoading = bool => {
  return {type: 'setLoading', payload: bool};
};

export const StatusReducer = (state = initialStatusState, action) => {
  switch (action.type) {
    case 'setLoading':
      return {isLoading: action.payload};
    default:
      return state;
  }
};
const initialState = {
  origin: null,
  destination: null,
  step: {name: 'init'},
  travelTimeinformations: null,
};

export const navSlices = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTime: (state, action) => {
      state.travelTimeinformations = action.payload;
    },
  },
});

export const {setOrigin, setDestination, setTravelTime, setStep} =
  navSlices.actions;

// selector
export const selectorigin = state => state.nav.origin;
export const selectdestination = state => state.nav.destination;
export const selecttravelTime = state => state.nav.travelTimeinformations;
export const selectStep = state => state.nav.step;

export default navSlices.reducer;
