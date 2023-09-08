import {createSlice} from '@reduxjs/toolkit';
import { StatusColor } from '../components/Overlay/SlideMessage';

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

const initialMessageState = {
  status: StatusColor.error,
  message: '',
  id: '',
};

export const showMessage = (status, message) => {
  const id = new Date().toString();

  return {type: 'showMessage', status, message, key: id};
};

export const MessageReducer = (state = initialMessageState, action) => {
  switch (action.type) {
    case 'showMessage':
      return {status: action.status, message: action.message, id: action.id};
    default:
      return state;
  }
};

const initialState = {
  origin: null,
  destination: null,
  LocationDriver: null,
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
    setLocationDriver: (state, action) => {
      state.LocationDriver = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTime,
  setStep,
  setLocationDriver,
} = navSlices.actions;

// selector
export const selectorigin = state => state.nav.origin;
export const selectdestination = state => state.nav.destination;
export const selecttravelTime = state => state.nav.travelTimeinformations;
export const selectStep = state => state.nav.step;
export const selectLocationDriver = state => state.nav.LocationDriver;

export default navSlices.reducer;