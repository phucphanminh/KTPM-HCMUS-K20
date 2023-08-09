import { createStore, combineReducers} from 'redux';
import { MessageReducer, StatusReducer } from './reducers';


const rootReducers=combineReducers({
	status: StatusReducer,
	slideMessage:MessageReducer,
})

export const store=createStore(rootReducers)

export type StoreType = ReturnType<typeof rootReducers>;