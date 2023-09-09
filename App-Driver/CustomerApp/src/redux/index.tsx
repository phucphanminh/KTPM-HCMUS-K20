import {createStore, combineReducers} from 'redux';
import {AuthReducer, MessageReducer, StatusReducer} from './reducers';
import navReducer from './reducers';

const rootReducers = combineReducers({
  status: StatusReducer,
  nav: navReducer,
  slideMessage:MessageReducer,
  auth:AuthReducer,
});
export const store = createStore(rootReducers);


export type StoreType = ReturnType<typeof rootReducers>;
