import * as api from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { END_PROCESS, GET_ALL_USER, GET_USER, LOGOUT, SIGNIN_USER, START_PROCESS } from '../reducers/types';

export const getAllUser = () => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.getAllUser();
        // console.log('All_USER_Data: ',data);
        dispatch({type: GET_ALL_USER, payload: data});
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