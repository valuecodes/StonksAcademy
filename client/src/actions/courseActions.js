import axios from "axios";
import { 
    SECTION_COMPLETE_REQUEST, SECTION_COMPLETE_SUCCESS,  SECTION_COMPLETE_FAIL
} from "../constants/courseConstants";

const completeSection = (section) => async (dispatch) => {
    try{
        dispatch({type: SECTION_COMPLETE_REQUEST})
        const { data } = await axios.post('/api/course',{section})
        console.log(data)
        dispatch({type: SECTION_COMPLETE_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: SECTION_COMPLETE_FAIL, payload:err.message})
    }
} 

export { completeSection }