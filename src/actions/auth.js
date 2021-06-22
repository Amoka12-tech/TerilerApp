import * as api from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { END_PROCESS, REGISTER_USER, SIGNIN_USER, START_PROCESS } from '../reducers/types';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

//Register User
export const register = (body) => async dispatch => {
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.register(body, config);
        dispatch({ type: REGISTER_USER, payload: data.payload.data });
        dispatch({type: END_PROCESS});
        alert(data.payload.status);
    } catch (error) {
        if(error){
            
            dispatch({type: END_PROCESS});
            if(error.response.data.payload){
                alert(error.response.data.payload);
            }else{
                console.log(error);
            }
            
        }
    }
};

export const login = (email, password) => async dispatch => {
    const body = {
        username_email: email,
        password: password
    };
    try {
        dispatch({type: START_PROCESS});
        const { data } = await api.login(body);
        const jsonData = JSON.stringify(data.payload);
        await AsyncStorage.setItem('@user', jsonData);
        dispatch({ type: SIGNIN_USER, payload: data.payload });
        //paload hold token, user
        // console.log('User: ',data)
        dispatch({ type: END_PROCESS });
    } catch (error) {
        if(error){
            dispatch({ type: END_PROCESS });
            alert(error.response.data.payload);
        }
    }
};

export const testReducer = () => async dispatch => {
    console.log('test');
    dispatch({type: START_PROCESS});
    setTimeout(() => {
        dispatch({type: END_PROCESS});
    }, 2000);
};