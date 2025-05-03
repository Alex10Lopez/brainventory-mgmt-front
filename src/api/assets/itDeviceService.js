import axios from "axios";

const API_URL = "http://localhost:8080/api/it-device";

export async function saveITDevice(itDevice) {
  const token = localStorage.getItem("jwtToken");
  return await axios.post(API_URL, itDevice, {
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

export async function updateITDevice(itDevice, id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.put(`${API_URL}/${id}`, itDevice, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteITDevice(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllITDevices() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/references`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
