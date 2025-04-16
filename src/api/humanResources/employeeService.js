import axios from "axios";

const API_URL = "http://localhost:8080/api/employee";

export async function saveEmployee(employee) {
  return await axios.post(API_URL, employee);
}

export async function findAll() {
  return await axios.get(API_URL);
}

export async function findById(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateEmployee(employee, id) {
  return await axios.put(`${API_URL}/${id}`, employee);
}

export async function deleteEmployee(id) {
  return await axios.delete(`${API_URL}/${id}`);
}
