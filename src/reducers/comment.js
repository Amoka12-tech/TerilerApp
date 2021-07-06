import { DELETE_COMMENTS, GET_COMMENTS, NEW_COMMENT, UPDATE_COMMENTS } from "./types";

export default function(comments = {}, action){
    const { type, payload } = action;
    switch (type) {
        case NEW_COMMENT:
            return payload;

        case UPDATE_COMMENTS:
            return payload;

        case DELETE_COMMENTS:
            return comments.filter((comment) => comment._id === payload);
    
        default:
            return comments;
    }
};