
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";


let setGlobalLoading = null;

export const registerLoadingHandler = (handler) => {
  setGlobalLoading = handler;
};

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});


let requestCount = 0;

function showLoader() {
  requestCount++;
  if (setGlobalLoading) setGlobalLoading(true);
}

function hideLoader() {
  requestCount--;
  if (requestCount <= 0) {
    requestCount = 0;
    if (setGlobalLoading) setGlobalLoading(false);
  }
}

api.interceptors.request.use(
  (config) => {
    showLoader();
    return config;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    hideLoader();
    return response;
  },
  (error) => {
    hideLoader();
    return Promise.reject(error);
  }
);

// ---- API FUNCTIONS ----

// GET /todos
export const getTodos = async () => {
  const response = await api.get("/todos/");
  return response.data;
};

// POST /todos
export const createTodo = async (payload) => {
  const response = await api.post("/todos/", payload);
  return response.data;
};

export default api;
