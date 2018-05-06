import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { polifluenceReducer } from '../reducers'

const store = createStore(
    combineReducers({
        polifluence: polifluenceReducer
    }),
    applyMiddleware(thunk)
);


export default store;