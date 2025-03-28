import axios from "axios";

const API_URL = "http://localhost:8090/api/job-role";

export async function findAllJobRole() {
  return await axios.get(`${API_URL}/references`);
}
