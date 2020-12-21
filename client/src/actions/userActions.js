import { 
    USER_LOGOUT, USER_AUTH_REQUEST, USER_AUTH_SUCCESS, USER_AUTH_FAIL 
} from '../constants/userConstants';
import axios from 'axios'

const signin = () => (dispatch) => {
    window.location.assign("/auth/google");
}

const userAuth = () => async (dispatch) => {
    try{
        dispatch({type: USER_AUTH_REQUEST})
        const { data } = await axios.post('/auth/userInfo')
        dispatch({type: USER_AUTH_SUCCESS, payload: data.userInfo})
    }catch(err){
        dispatch({type: USER_AUTH_FAIL, payload: err.msg})        
    }
}

const logout = () => async (dispatch) => {
    await axios.post('/auth/logout', { } , { withCredentials: true })
    dispatch({type: USER_LOGOUT})
    window.location.reload();
}

export { signin, logout, userAuth }