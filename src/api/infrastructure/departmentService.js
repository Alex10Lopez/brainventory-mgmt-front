import axios from "axios";

const API_URL = "http://localhost:8080/api/department";

export async function findAllDepartments() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/references`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
