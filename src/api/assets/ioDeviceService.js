import axios from "axios";

const API_URL = "http://localhost:8080/api/io-device";

export async function saveIODevice(ioDevice) {
  const token = localStorage.getItem("jwtToken");
  return await axios.post(API_URL, ioDevice, {
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

export async function updateIODevice(ioDevice, id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.put(`${API_URL}/${id}`, ioDevice, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteIODevice(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
