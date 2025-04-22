import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export async function login(employee) {
  try {
    const response = await axios.post(`${API_URL}/login`, employee);
    localStorage.setItem("jwtToken", response.data.token);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function register(employee) {
  try {
    const response = await axios.post(`${API_URL}/register`, employee);
    if (response.data.token) {
      localStorage.setItem("jwtToken", response.data.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
}
