import * as api from '../api/comment';
import { DELETE_COMMENTS, END_PROCESS, GET_COMMENTS, NEW_COMMENT, START_PROCESS, UPDATE_COMMENTS, UPDATE_POST } from '../reducers/types';

//Create Comment
export const createComment = (id, body) => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.createComment(id, body);
        dispatch({type: UPDATE_POST, payload: data.payload.updatePost});
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response.data){
            alert(error.response.data.payload);
        }
        dispatch({type: END_PROCESS});
    }
};

//Update Comment
export const updateComment = (id, body) => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.updateComment(id, body);
        console.log("Updated Comment: ", data.payload);
        dispatch({type: UPDATE_POST, payload: data.payload.post});
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response.data){
            alert(error.response.data.payload);
        }
        dispatch({type: END_PROCESS});
    }
};

//Delete Comment
export const deleteComment = (id) => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.deleteComment(id);
        dispatch({type: UPDATE_POST, payload: data.post});
        dispatch({type: END_PROCESS});
        alert(data.payload);
    } catch (error) {
        if(error.response.data){
            alert(error.response.data.payload);
        };
        dispatch({type: END_PROCESS});
    }
};