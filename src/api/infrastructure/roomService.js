import axios from "axios";

const API_URL = "http://localhost:8080/api/room";

export async function saveRoom(room) {
  const token = localStorage.getItem("jwtToken");
  return await axios.post(API_URL, room, {
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

export async function updateRoom(room, id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.put(`${API_URL}/${id}`, room, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteRoom(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllRooms() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/references`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
