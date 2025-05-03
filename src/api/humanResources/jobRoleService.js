import axios from "axios";

const API_URL = "http://localhost:8080/api/job-role";

export async function findAllJobRole() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/references`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
