import * as api from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { END_PROCESS, GET_ALL_USER, GET_USER, LOGOUT, SIGNIN_USER, START_PROCESS, UPDATE_USER } from '../reducers/types';

export const getUser = (id) => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.getUser(id);
        dispatch({type: GET_USER, payload: data.payload});
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response){
            alert(error.response.data.payload)
        }
        dispatch({type: END_PROCESS});
    }
};

export const getAllUser = () => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.getAllUser();
        // console.log('All_USER_Data: ',data.payload);
        dispatch({type: GET_ALL_USER, payload: data.payload});
        dispatch({type: END_PROCESS});
    } catch (error) {
        if(error.response){
            alert(error.response.data.payload);
        }
        dispatch({type: END_PROCESS});
    }
};

export const loadUser = (setIsLoggedIn, setLoading) => async dispatch => {
    try {
        dispatch({ type: START_PROCESS });
        const userData = await AsyncStorage.getItem('@user');
        const jsonData = userData != null ? JSON.parse(userData) : null;
        if(jsonData != null){
            dispatch({ type: SIGNIN_USER, payload: jsonData });
            setIsLoggedIn(true); 
            setLoading(false);
            console.log('Store Data: ',jsonData);
        }else{
            dispatch({ type: END_PROCESS });
        }
    } catch (error) {
        if(error){
            alert(error);
        }
    }
};

export const logout = () => async dispatch => {
    //Logout
    try {
        dispatch({type: START_PROCESS});
        await AsyncStorage.removeItem('@user');
        dispatch({ type: LOGOUT, payload: null });
    } catch (error) {
        if(error){
            console.log(error);
            dispatch({type: END_PROCESS});
        }
    }
};

export const updateProfilePicture = (body, setIsLoading, configProgress) => async (dispatch) => {
    setIsLoading(true);
    try {
        const { data } = await api.updateProfilePicture(body, configProgress);
        console.log('Success: ',data);
        setIsLoading(false),
        alert(data?.payload?.status);
    } catch (error) {
        if(error.response){
            alert('Error in picture upload');
        }
        console.log("Error: ",error);
    }
};

export const updateUserProfile = (body) => async (dispatch) => {
    dispatch({type: START_PROCESS});
    try {
        const { data } = await api.updateUserProfile(body);
        const userData = await AsyncStorage.getItem('@user');
        const jsonData = userData != null ? JSON.parse(userData) : null;
        if(jsonData !== null){
            jsonData.user = data.payload.user;
            await AsyncStorage.setItem('@user', JSON.stringify(jsonData));
            const newUserData = await AsyncStorage.getItem('@user');
            dispatch({type: UPDATE_USER, payload: JSON.parse(newUserData)});
            dispatch({type: END_PROCESS});
            alert(data?.payload?.status);
        }
        
    } catch (error) {
        if(error.response){
            alert(error.response.data.payload);
        }
        console.log(error);
        dispatch({type: END_PROCESS});
    }
};