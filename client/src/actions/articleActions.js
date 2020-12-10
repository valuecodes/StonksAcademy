import axios from "axios";
import { 
    ARTICLE_COMPLETE_REQUEST, ARTICLE_COMPLETE_SUCCESS,  ARTICLE_COMPLETE_FAIL
} from "../constants/articleConstants";

const completeArticle = (article) => async (dispatch) => {
    try{
        dispatch({type: ARTICLE_COMPLETE_REQUEST})
        const { data } = await axios.post('/api/article',{article})
        console.log(data)
        dispatch({type: ARTICLE_COMPLETE_SUCCESS, payload: data})
    }catch(err){
        dispatch({type: ARTICLE_COMPLETE_FAIL, payload:err.message})
    }
} 

export { completeArticle }