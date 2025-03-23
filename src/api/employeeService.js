import axios from "axios";

const API_URL = "http://localhost:8090/api/employee";

export const saveEmployee = async (employeeData) => {
  return await axios.post("http://localhost:8090/api/employee", employeeData);
};

export async function findAll() {
  return await axios.get(API_URL);
}

export async function findById(id) {
  return await axios.get(`${API_URL}/${id}`);
}

export async function updateEmployee(employee, id) {
  return await axios.update(`${API_URL}/${id}`, employee);
}

export async function deleteEmployee(id) {
  return await axios.delete(`${API_URL}/${id}`);
}
