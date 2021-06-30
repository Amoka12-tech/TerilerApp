import { apiRoute } from '../utils/apiConfig';

const API = apiRoute;

export const createPost = (body, configProgress) => API.post('/api/post/new', body, configProgress);

export const getAllPost = (postSkip, postLimit) => API.get(`/api/post/sort/${postSkip}/${postLimit}`);

export const getPost = (id) => API.get(`/api/post/${id}`);

export const deletePost = (id) => API.delete(`/api/post/delete/${id}`);

export const likePost = (id) => API.put(`/api/post/like/${id}`);
