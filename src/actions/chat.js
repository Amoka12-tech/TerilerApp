import * as api from '../api/chat';
import { CREATE_CHAT, END_PROCESS, GET_ALL_CHATS, GET_CHAT, START_PROCESS } from '../reducers/types';

export const createChat = (id, body) => async dispacth => {
    try {
        dispacth({type: START_PROCESS});
        const { data } = api.createChat(id, body);
        dispacth({type: CREATE_CHAT, payload: data?.payload});
        console.log("New Chat: ", data);
        dispacth({type: END_PROCESS});
    } catch (error) {
        if(error.response.data){
            console.log(error.response.data.payload);
        }
        dispacth({type: END_PROCESS});
    }
};

//Get Single Chat
export const getSingleChat = (id) => async dispacth => {
    try {
        dispacth({type: START_PROCESS});
        const { data } = api.getSingleChat(id);
        dispacth({type: GET_CHAT, payload: data?.payload});
        console.log("Single Chat: ", data);
        dispacth({type: END_PROCESS});
    } catch (error) {
        if(error.response.data){
            console.log(error.response.data.payload);
        }
        dispacth({type: END_PROCESS});
    }
};

//Get all Chats
export const getChats = () => async dispacth => {
    try {
        dispacth({type: START_PROCESS});
        const { data } = api.getChats();
        dispacth({type: GET_ALL_CHATS, payload: data?.payload});
        console.log("All Chat: ", data);
        dispacth({type: END_PROCESS});
    } catch (error) {
        if(error.response.data){
            console.log(error.response.data.payload);
        }
        dispacth({type: END_PROCESS});
    }
};