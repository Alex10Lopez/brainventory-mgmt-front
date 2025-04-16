import axios from "axios";

const API_URL = "http://localhost:8080/api/building";

export async function saveBuilding(building) {
  return await axios.post(API_URL, building);
}

export async function findAll() {
  return await axios.get(API_URL);
}

export async function findById(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateBuilding(building, id) {
  return await axios.put(`${API_URL}/${id}`, building);
}

export async function deleteBuilding(id) {
  return await axios.delete(`${API_URL}/${id}`);
}

export async function findAllBuildings() {
  return await axios.get(`${API_URL}/references`);
}
