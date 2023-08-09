import {createStore, combineReducers} from 'redux';
import {StatusReducer} from './reducers';
import {configureStore} from '@reduxjs/toolkit';
import navReducer from './reducers';

const rootReducers = combineReducers({
  status: StatusReducer,
  nav: navReducer,
});

export const store = createStore(rootReducers);

// export const store = configureStore({
//   reducer: {
//     status: StatusReducer,
//     nav: navSlices,
//   },
// });

export type StoreType = ReturnType<typeof rootReducers>;
