import { createStore, combineReducers} from 'redux';
import { StatusReducer } from './reducers';


const rootReducers=combineReducers({
	status: StatusReducer
})

export const store=createStore(rootReducers)

export type StoreType = ReturnType<typeof rootReducers>;