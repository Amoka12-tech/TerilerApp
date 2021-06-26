import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const getUser = (id) => API.get(`/api/user/${id}`);
export const getAllUser = () => API.get('/api/user');
export const updateProfilePicture = (body, configProgresss) => API.put('/api/user/update/photo', body, configProgresss);
export const updateUserProfile = (body) => API.put('/api/user/update', body);
export const followUser = (id) => API.post(`api/user/follow/${id}`);
export const unFollowUser = (id) => API.post(`/api/user/unfollow/${id}`);