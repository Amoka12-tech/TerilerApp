import { CREATE_POST, DELETE_POST, GET_ALL_POST, LOAD_MORE_POST, UPDATE_POST } from "./types";

export default function(post = [], action){
    const {type, payload} = action;

    switch (type) {
        case CREATE_POST:
            return [...post, payload].sort((a, b) => -1);

        case GET_ALL_POST:
            return payload;

        case UPDATE_POST:
            const postIndex = post.findIndex((element) => element?._id === payload?._id);
            const newPostArray = [...post];
            newPostArray[postIndex] = payload;
            return newPostArray;

        case LOAD_MORE_POST:
            return [...post.concat(payload)]

        case DELETE_POST:
            return post.filter((item) =>  item._id !== payload);
    
        default:
            return post;
    }
};