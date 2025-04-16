import axios from "axios";

const API_URL = "http://localhost:8080/api/hardware";

export async function findAllITDeviceNames() {
  return await axios.get(`${API_URL}/it-devices`);
}

export async function findAllIODeviceNames() {
  return await axios.get(`${API_URL}/io-devices`);
}

export async function findAllHardwareBrands() {
  return await axios.get(`${API_URL}/brands`);
}

export async function findAllITDeviceLines() {
  return await axios.get(`${API_URL}/it-lines`);
}

export async function findAllIODeviceLines() {
  return await axios.get(`${API_URL}/io-lines`);
}

export async function findAllHardwareSeries() {
  return await axios.get(`${API_URL}/series`);
}
