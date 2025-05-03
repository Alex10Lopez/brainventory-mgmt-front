import axios from "axios";

const API_URL = "http://localhost:8080/api/hardware";

export async function findAllITDeviceNames() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/it-devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllIODeviceNames() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/io-devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllHardwareBrands() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/brands`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllITDeviceLines() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/it-lines`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllIODeviceLines() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/io-lines`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllHardwareSeries() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/series`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
