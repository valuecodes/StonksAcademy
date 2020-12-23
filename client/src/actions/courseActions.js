import axios from "axios";
import { 
    SECTION_COMPLETE_REQUEST, SECTION_COMPLETE_SUCCESS,  SECTION_COMPLETE_FAIL, SECTION_RESET_STATUS,
    SECTION_GET_COMPLETED_REQUEST,SECTION_GET_COMPLETED_SUCCESS,SECTION_GET_COMPLETED_FAIL
} from "../constants/courseConstants";

const getCompletedSections = (section) => async (dispatch) => {
    try{
        dispatch({type: SECTION_GET_COMPLETED_REQUEST})
        const { data } = await axios.get('/api/course/completed')
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


const resetStatus = () => (dispatch) =>{
    dispatch({type: SECTION_RESET_STATUS})
} 

export { completeSection, resetStatus, getCompletedSections }