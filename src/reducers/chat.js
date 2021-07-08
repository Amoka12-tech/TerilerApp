import { CREATE_CHAT, GET_ALL_CHATS, GET_CHAT } from "./types";

const initialChat = {
    chat: null,
    allChat: [],
};

export default function(state = initialChat, action){
    const {type, payload} = action;
    switch (type) {
        case CREATE_CHAT:
            return {
                ...state,
                chat: payload
            };

        case GET_CHAT:
            return {
                ...state,
                chat: payload
            };

        case GET_ALL_CHATS:
            return {
                ...state,
                allChat: payload
            };
    
        default:
            return {...state};
    }
};