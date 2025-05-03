import axios from "axios";

const API_URL = "http://localhost:8080/profile";

export async function findByEmail(email) {
  const token = localStorage.getItem("jwtToken");

  const encodedEmail = encodeURIComponent(email);

  return await axios.get(`${API_URL}/${encodedEmail}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
