import axios from "axios";

const API_URL = "http://localhost:9000/api/department";

export async function findAllDepartments() {
  return await axios.get(`${API_URL}/references`);
}
