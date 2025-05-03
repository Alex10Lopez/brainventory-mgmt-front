import axios from "axios";

const API_URL = "http://localhost:8080/api/building";

export async function saveBuilding(building) {
  const token = localStorage.getItem("jwtToken");
  return await axios.post(API_URL, building, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAll() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findById(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateBuilding(building, id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.put(`${API_URL}/${id}`, building, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteBuilding(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllBuildings() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/references`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
