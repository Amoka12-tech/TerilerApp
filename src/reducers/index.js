import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import media from './media';
import post from './post';

export default combineReducers({
    auth,
    user,
    media,
    post,
});