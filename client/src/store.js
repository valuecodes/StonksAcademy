import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { userSigninReducer } from './reducers/userReducers';

const userInfo = Cookie.getJSON('userInfo') || null
const initialState = {userSignin:{userInfo}}

const reducer = combineReducers({
    userSignin:userSigninReducer
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose

const store = createStore(reducer, initialState, composeEnchancer(applyMiddleware(thunk)))
export default store