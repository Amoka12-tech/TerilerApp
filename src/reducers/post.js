import { CREATE_POST, DELETE_POST, GET_ALL_POST } from "./types";

export default function(post = [], action){
    const {type, payload} = action;

    switch (type) {
        case CREATE_POST:
            return [...post, payload];

        case GET_ALL_POST:
            return payload;

        case DELETE_POST:
            return post.filter((item) =>  item._id !== payload);
    
        default:
            return post;
    }
};