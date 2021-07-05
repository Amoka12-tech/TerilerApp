import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import media from './media';
import post from './post';
import comment from './comment';

export default combineReducers({
    auth,
    user,
    media,
    post,
    comment,
});