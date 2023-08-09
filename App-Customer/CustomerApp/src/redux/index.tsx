import {createStore, combineReducers} from 'redux';
import {MessageReducer, StatusReducer} from './reducers';
import {configureStore} from '@reduxjs/toolkit';
import navReducer from './reducers';

const rootReducers = combineReducers({
  status: StatusReducer,
  nav: navReducer,
  slideMessage:MessageReducer,
});
export const store = createStore(rootReducers);


export type StoreType = ReturnType<typeof rootReducers>;
