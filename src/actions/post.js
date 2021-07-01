import * as api from '../api/post';
import { CREATE_POST, DELETE_POST, END_PROCESS, GET_ALL_POST, LOAD_MORE_POST, REMOVE_ALL_MEDIA, START_PROCESS, UPDATE_POST } from '../reducers/types';

const config = {
    onUploadProgress: progressEvent => console.log(progressEvent.loaded),
};

//get initial all posts with initial limits
export const getAllPost = (postSkip, setPostSkip, postLimit, setPostLimit) => async (dispatch) => {
    try {
        const { data } = await api.getAllPost(postSkip, postLimit);
        dispatch({type: GET_ALL_POST, payload: data.payload});
        setPostSkip(postLimit);
        setPostLimit(postLimit*2);
    } catch (error) {
        if(error.response){
            console.log("Get Post Error: ", error.response.data.payload);
        }
    }
};

//Load more posts with skip and limit from previous
export const loadMorePost = (postSkip, setPostSkip, postLimit, setPostLimit, setLoading) => async (dispatch) => {
    try {
        setLoading(true);
        const { data } = await api.getAllPost(postSkip, postLimit);
        dispatch({type: LOAD_MORE_POST, payload: data.payload});
        setPostSkip(postLimit);
        setPostLimit(postLimit*2);
        setLoading(false);
    } catch (error) {
        if(error.response){
            alert("Get Post Error: ", error.response.data.payload);
        }
    }
};

export const createPost = (body, navigation, configProgress, setIsProgress) => async (dispatch) => {
    
    setIsProgress(true);
    try {
        const { data } = await api.createPost(body, configProgress);
        // console.log('Post Data: ',data.payload.createdPost);
        dispatch({type: CREATE_POST, payload: data.payload.createdPost});
        dispatch({type: REMOVE_ALL_MEDIA});
        setIsProgress(false);
        navigation.navigate('Main');
    } catch (error) {
        if(error.response){
            alert(error.response.data.payload);
        }
        console.log('Error',error.response.data.payload);
        setIsProgress(false);
    } finally{
        setIsProgress(false);
    }
} 

export const deletePost = (id, setBs) => async (dispatch) => {
    dispatch({type: START_PROCESS});
    try {
        const { data } = await api.deletePost(id);
        dispatch({type: DELETE_POST, payload: id});
        alert("Post Deleted");
        setBs(false);
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response){
            alert("Error: ",error.response.data.payload);
            setBs(false);
        }
        setBs(false);
        dispatch({type: END_PROCESS});
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.likePost(id);
        dispatch({type: UPDATE_POST, payload: data?.payload});
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response){
            alert(error.response.data.payload);
        }
        dispatch({type: END_PROCESS});
    }
};

