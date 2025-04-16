import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export async function login(employee) {
  return await axios.post(`${API_URL}/login`, employee);
}

export async function register(employee) {
  return await axios.post(`${API_URL}/register`, employee);
}
