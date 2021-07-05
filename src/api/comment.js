import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const createComment = (id, body) => API.post(`/api/comment/new/${id}`, body);
export const updateComment = (id, body) => API.put(`/api/comment/update/${id}`, body);
export const getComments = (id) => API.get(`/api/comment/${id}`);
export const deleteComment = (id) => API.del(`/api/comment/delete/${id}`);