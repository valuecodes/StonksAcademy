import { 
    SECTION_COMPLETE_REQUEST, SECTION_COMPLETE_SUCCESS, SECTION_COMPLETE_FAIL, SECTION_RESET_STATUS, SECTION_GET_COMPLETED_REQUEST, SECTION_GET_COMPLETED_SUCCESS, SECTION_GET_COMPLETED_FAIL } from "../constants/courseConstants";

function sectionGetCompletedReducer(state={},action){
    switch(action.type){
        case SECTION_GET_COMPLETED_REQUEST:
            return {loading:true}
        case SECTION_GET_COMPLETED_SUCCESS:
            console.log(action.payload)
            return {loading:false, completedSections: action.payload}
        case SECTION_GET_COMPLETED_FAIL:
            return {loading:false, error: action.payload}
        default: return state
    }
}

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

export { 
    sectionCompleteReducer, sectionGetCompletedReducer 
}