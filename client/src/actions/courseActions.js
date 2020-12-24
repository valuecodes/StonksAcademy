import axios from "axios";
import { 
    SECTION_COMPLETE_REQUEST, SECTION_COMPLETE_SUCCESS,  SECTION_COMPLETE_FAIL, SECTION_RESET_STATUS,
    SECTION_GET_COMPLETED_REQUEST,SECTION_GET_COMPLETED_SUCCESS,SECTION_GET_COMPLETED_FAIL,
    COURSES_RESET_REQUEST, COURSES_RESET_SUCCESS, COURSES_RESET_FAIL
} from "../constants/courseConstants";

const getCompletedSections = (id='') => async (dispatch) => {
    try{
        dispatch({type: SECTION_GET_COMPLETED_REQUEST})
        const { data } = await axios.get('/api/course/completed/'+id)
        dispatch({type: SECTION_GET_COMPLETED_SUCCESS, payload: data.data})
    }catch(err){
        dispatch({type: SECTION_GET_COMPLETED_FAIL, payload:err.message})
    }
}

const completeSection = (section) => async (dispatch) => {
    try{
        dispatch({type: SECTION_COMPLETE_REQUEST})
        const { data } = await axios.post('/api/course',{section})
        dispatch({type: SECTION_COMPLETE_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: SECTION_COMPLETE_FAIL, payload:err.message})
    }
} 

const resetUserCourses = () => async (dispatch) => {
    try{
        dispatch({type: COURSES_RESET_REQUEST})
        const { data } = await axios.delete('/api/course')
        dispatch({type: COURSES_RESET_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: COURSES_RESET_FAIL, payload:err.message})
    }
}

const resetStatus = () => (dispatch) =>{
    dispatch({type: SECTION_RESET_STATUS})
} 

export { 
    completeSection, 
    resetStatus, 
    getCompletedSections, 
    resetUserCourses
}