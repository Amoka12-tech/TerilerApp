import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const getAllUser = () => API.get('/api/user');