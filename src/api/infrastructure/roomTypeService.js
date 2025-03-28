import axios from "axios";

const API_URL = "http://localhost:9000/api/room-type";

export async function findAllRoomTypes() {
  return await axios.get(`${API_URL}/references`);
}
