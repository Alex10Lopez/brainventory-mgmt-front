import axios from "axios";

const API_URL = "http://localhost:8080/api/room";

export async function saveRoom(room) {
  return await axios.post(API_URL, room);
}

export async function findAll() {
  return await axios.get(API_URL);
}

export async function findById(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateRoom(room, id) {
  return await axios.put(`${API_URL}/${id}`, room);
}

export async function deleteRoom(id) {
  return await axios.delete(`${API_URL}/${id}`);
}

export async function findAllRooms() {
  return await axios.get(`${API_URL}/references`);
}
