import { GET_ALL_USER, GET_USER } from "./types";

export default function(state = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USER:
            return {
                ...state, payload
            };
        case GET_ALL_USER:
            return {
                ...state, payload
            };
    
        default:
            return {...state};
    }
};