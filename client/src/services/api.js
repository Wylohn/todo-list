import axios from "axios";

const API_URL = "http://localhost:5000/api";

const handleApiError = (error) => {
  const message = error.response?.data?.message || "Une erreur est survenue";
  throw new Error(message);
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const todoApi = {
  getAll: () => axios.get(`${API_URL}/todos`).catch(handleApiError),
  create: (todo) => axios.post(`${API_URL}/todos`, todo).catch(handleApiError),
  update: (id, todo) =>
    axios.put(`${API_URL}/todos/${id}`, todo).catch(handleApiError),
  delete: (id) => axios.delete(`${API_URL}/todos/${id}`).catch(handleApiError),
  toggle: (id) =>
    axios.patch(`${API_URL}/todos/${id}/toggle`).catch(handleApiError),
};

export const authApi = {
  register: (userData) =>
    axios.post(`${API_URL}/auth/register`, userData).catch(handleApiError),
  login: (credentials) =>
    axios.post(`${API_URL}/auth/login`, credentials).catch(handleApiError),
};

export { setAuthToken };
