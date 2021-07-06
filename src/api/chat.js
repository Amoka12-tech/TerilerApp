import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const createChat = (id, body) => API.post(`/api/chat/new/${id}`, body);

export const getSingleChat = (id) => API.get(`/api/chat/${id}`);
export const getChats = () => API.get(`/api/chat/`);