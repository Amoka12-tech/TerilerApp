import { CREATE_CHAT, GET_ALL_CHATS, GET_CHAT } from "./types";

export default function(chat = [], action){
    const {type, payload} = action;
    switch (type) {
        case CREATE_CHAT:
            return payload;

        case GET_CHAT:
            return payload;

        case GET_ALL_CHATS:
            return payload;
    
        default:
            return chat;
    }
};