import { 
    SECTION_COMPLETE_REQUEST, SECTION_COMPLETE_SUCCESS, SECTION_COMPLETE_FAIL, SECTION_RESET_STATUS } from "../constants/courseConstants";


function sectionCompleteReducer(state={}, action){
    switch(action.type){
        case SECTION_COMPLETE_REQUEST:
            return {loading:true}
        case SECTION_COMPLETE_SUCCESS:
            return {loading:false, success:true}
        case SECTION_COMPLETE_FAIL:
            return {loading:false, error: action.payload}
        case SECTION_RESET_STATUS:
            return {loading:false,success:false,error:false}
        default: return state
    }
}

export { sectionCompleteReducer }