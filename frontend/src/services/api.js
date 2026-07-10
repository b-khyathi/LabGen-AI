import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

// ---------------- AI ----------------

export const generateManual = async (manualData) => {
  const response = await api.post("/generate", manualData);
  return response.data;
};

export const askAI = async (message, manual, history) => {
  const response = await api.post("/chat", {
    message,
    manual,
    history,
  });

  return response.data;
};

export const improveNotes = async (text) => {
  const response = await api.post("/improve", { text });
  return response.data;
};

export const summarizeNotes = async (text) => {
  const response = await api.post("/summarize", { text });
  return response.data;
};

// ---------------- Notes ----------------

export const getNotes = () => api.get("/notes");

export const createNote = (data) => api.post("/notes", data);

export const updateNote = (id, data) => api.put(`/notes/${id}`, data);

export const deleteNote = (id) => api.delete(`/notes/${id}`);
