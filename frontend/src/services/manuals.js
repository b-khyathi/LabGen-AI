import api from "./api";

export const getManuals = () => api.get("/manuals");

export const getManual = (id) => api.get(`/manuals/${id}`);

export const saveManual = (manual) => api.post("/manuals", manual);

export const deleteManual = (id) => api.delete(`/manuals/${id}`);
