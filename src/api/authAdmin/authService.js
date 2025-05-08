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

export async function register({ admin, image }) {
  try {
    const formData = new FormData();

    formData.append(
      "admin",
      new Blob([JSON.stringify(admin)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.token) {
      localStorage.setItem("jwtToken", response.data.token);
    }

    return response;
  } catch (error) {
    throw error;
  }
}
