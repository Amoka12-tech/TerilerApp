import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const register = (data) => API.post('/api/user/register', data);
export const login = (data) => API.post('/api/user/login', data);