import axios from "axios";

const API_URL = "http://localhost:9010/api/io-device";

export async function saveIODevice(ioDevice) {
  return await axios.post(API_URL, ioDevice);
}

export async function findAll() {
  return await axios.get(API_URL);
}

export async function findById(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateIODevice(ioDevice, id) {
  return await axios.put(`${API_URL}/${id}`, ioDevice);
}

export async function deleteIODevice(id) {
  return await axios.delete(`${API_URL}/${id}`);
}
