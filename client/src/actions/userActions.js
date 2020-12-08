import { USER_LOGOUT, USER_AUTH_REQUEST, USER_AUTH_SUCCESS, USER_AUTH_FAIL } from '../constants/userConstants';
import Cookie from 'js-cookie'
import axios from 'axios'

const signin = () => (dispatch) => {
    window.location.assign("http://localhost:5000/auth/google");
}

const userAuth = () => async (dispatch) => {
    try{
        dispatch({type: USER_AUTH_REQUEST})
        const { data } = await axios.post('auth/login/success')
        dispatch({type: USER_AUTH_SUCCESS, payload: data.user})
        Cookie.set('userInfo',JSON.stringify(data.user), { expires: 1 })
    }catch(err){
        dispatch({type: USER_AUTH_FAIL, payload: err.msg})        
    }
}

const logout = () => async (dispatch) => {
    await axios.post('auth/logout', { } , { withCredentials: true })
    dispatch({type: USER_LOGOUT})
}

export { signin, logout, userAuth }