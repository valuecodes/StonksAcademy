import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { userSigninReducer } from './reducers/userReducers';
import { sectionCompleteReducer } from './reducers/courseReducers';

const initialState = {}

const reducer = combineReducers({
    userSignin:userSigninReducer,
    sectionComplete:sectionCompleteReducer
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose

const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)))
export default store