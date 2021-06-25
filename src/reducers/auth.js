import { END_PROCESS, LOGOUT, REGISTER_USER, SIGNIN_USER, START_PROCESS, UPDATE_USER } from "./types";

const initialState = {
    user : null,
    loading : false,
    isLoggedIn :  false,
};

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case  SIGNIN_USER:
            return {
                ...state,
                user : payload,
                isLoggedIn : true,
                loading : false,
            };
        case REGISTER_USER:
            return {
                ...state,
                user : payload
            };
        case UPDATE_USER:
            return {
                ...state,
                user : payload
            };
        case START_PROCESS:
            return {
                ...state,
                loading: true
            };
        case END_PROCESS:
            return {
                ...state,
                loading: false
            };
        case LOGOUT:
            return {
                user : null,
                loading : false,
                isLoggedIn :  false,
            };
    
        default:
            return {...state};
    }
};