import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const getAllUser = () => API.get('/api/user');
export const updateProfilePicture = (body, configProgresss) => API.put('api/user/update/photo', body, configProgresss);
export const updateUserProfile = (body) => API.put('api/user/update', body);