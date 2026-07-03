import http from "../http-common";


const API_BASE = "/api/players";

const getAll = () => {
  return http.get(`${API_BASE}/getall`);
};

const get = (playerId) => {
  return http.get(`${API_BASE}/get/${playerId}`);
};

const create = (data) => {
  return http.post(`${API_BASE}/add`, data);
};

const update = (playerId, data) => {
  return http.put(`${API_BASE}/update/${playerId}`, data);
};

const updateByJerseyNumber = (jerseyNumber, data) => {
  return http.put(`${API_BASE}/updateby/${jerseyNumber}`, data);
};

const deletePlayer = (playerId) => {
  return http.delete(`${API_BASE}/delete/${playerId}`);
};


const PlayerService = {
  getAll,
  get,
  create,
  update,
  updateByJerseyNumber,
  deletePlayer
};

export default PlayerService;