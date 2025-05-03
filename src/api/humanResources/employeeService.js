import axios from "axios";

const API_URL = "http://localhost:8080/api/employee";

export async function saveEmployee(employee) {
  const token = localStorage.getItem("jwtToken");
  return await axios.post(API_URL, employee, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAll() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findById(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateEmployee(employee, id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.put(`${API_URL}/${id}`, employee, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteEmployee(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
