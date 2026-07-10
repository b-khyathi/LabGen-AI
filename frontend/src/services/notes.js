import api from "./api";

export const getNotes = () => api.get("/notes");

export const createNote = (note) => api.post("/notes", note);

export const updateNote = (id, note) => api.put(`/notes/${id}`, note);

export const deleteNote = (id) => api.delete(`/notes/${id}`);
