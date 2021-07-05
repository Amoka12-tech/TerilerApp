import { DELETE_COMMENTS, GET_COMMENTS, NEW_COMMENT, UPDATE_COMMENTS } from "./types";

export default function(comments = [], action){
    const { type, payload } = action;
    switch (type) {
        case NEW_COMMENT:
            return [...comments, payload].sort((a, b) => -1);

        case GET_COMMENTS:
            return comments;

        case UPDATE_COMMENTS:
            const commentIndex = comments.findIndex((comment) => comment?._id === payload._id);
            const newCommentsArray = [...comments];
            newCommentsArray[commentIndex] = payload;
            return newCommentsArray;

        case DELETE_COMMENTS:
            return comments.filter((comment) => comment._id === payload);
    
        default:
            return comments;
    }
};