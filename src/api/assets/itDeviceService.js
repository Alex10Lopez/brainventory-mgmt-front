import axios from "axios";

const API_URL = "http://localhost:8080/api/it-device";

export async function saveITDevice(itDevice) {
  return await axios.post(API_URL, itDevice);
}

export async function findAll() {
  return await axios.get(API_URL);
}

export async function findById(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateITDevice(itDevice, id) {
  return await axios.put(`${API_URL}/${id}`, itDevice);
}

export async function deleteITDevice(id) {
  return await axios.delete(`${API_URL}/${id}`);
}

export async function findAllITDevices() {
  return await axios.get(`${API_URL}/references`);
}
