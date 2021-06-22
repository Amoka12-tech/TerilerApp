import * as api from '../api/post';
import { CREATE_POST, DELETE_POST, END_PROCESS, GET_ALL_POST, REMOVE_ALL_MEDIA, START_PROCESS } from '../reducers/types';

const config = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded),
};

export const getAllPost = () => async (dispatch) => {
    dispatch({type: START_PROCESS});
    try {
        const { data } = await api.getAllPost();
        dispatch({type: GET_ALL_POST, payload: data.payload});
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response){
            console.log("Get Post Error: ", error.response.data.payload);
        }
        dispatch({type: END_PROCESS});
    }
};

export const createPost = (body, navigation, configProgress, setIsProgress) => async (dispatch) => {
    dispatch({type: START_PROCESS});
    setIsProgress(true);
    try {
        const { data } = await api.createPost(body, configProgress);
        console.log('Post Data: ',data.payload.createdPost);
        dispatch({type: CREATE_POST, payload: data.payload.createdPost});
        dispatch({type: REMOVE_ALL_MEDIA});
        dispatch({type: END_PROCESS});
        setIsProgress(false);
        navigation.navigate('Main');
    } catch (error) {
        if(error.response){
            console.log(error.response.data);
        }
        console.log('Error',error.response.data.payload);
        dispatch({type: END_PROCESS});
        setIsProgress(false);
    } finally{
        dispatch({type: END_PROCESS});
        setIsProgress(false);
    }
} 

export const deletePost = (id, setBs) => async (dispatch) => {
    dispatch({type: START_PROCESS});
    console.log(id);
    try {
        const { data } = await api.deletePost(id);
        dispatch({type: DELETE_POST, payload: id});
        console.log("Message: ",data.payload);
        setBs(false);
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response){
            console.log("Error: ",error.response.data.payload);
            setBs(false);
        }
        setBs(false);
        dispatch({type: END_PROCESS});
    }
};

