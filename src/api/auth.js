import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const register = (data) => API.post('/api/user/register', data);
export const login = (data) => API.post('/api/user/login', data);

export const googleOAuth = () => API.get(`/api/oauth/google/`);
export const facebookOAuth = () => API.get(`/api/oauth/facebook`);