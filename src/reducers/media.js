import { ADD_MEDIA, REMOVE_ALL_MEDIA, REMOVE_MEDIA, UPDATE_MEDIA } from "./types";

export default function (media = [], action) {
    const {type, payload} = action;

    switch (type) {
        case REMOVE_ALL_MEDIA:
            return media = [];
        case REMOVE_MEDIA:
            return media = payload;

        case ADD_MEDIA:
            return media = payload;
        
        case UPDATE_MEDIA:
            return [...media, payload];
    
        default:
            return media;
    }
};