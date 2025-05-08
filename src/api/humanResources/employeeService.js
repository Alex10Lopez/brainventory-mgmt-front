import axios from "axios";

const API_URL = "http://localhost:8080/api/employee";

export async function saveEmployee({ employee, image }) {
  const token = localStorage.getItem("jwtToken");

  const formData = new FormData();

  console.log("Datos recibidos:", { employee, image });

  formData.append(
    "employee",
    new Blob([JSON.stringify(employee)], {
      type: "application/json",
    })
  );

  if (image) {
    formData.append("image", image);
    console.log("Imagen adjuntada:", image.name, image.type);
  }

  console.log("Contenido de FormData:");
  for (let [key, value] of formData.entries()) {
    if (key === "employee") {
      value.text().then((text) => console.log(key, text));
    } else {
      console.log(key, value);
    }
  }

  return await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function findAll(email) {
  const token = localStorage.getItem("jwtToken");

  const encodedEmail = encodeURIComponent(email);

  return await axios.get(`${API_URL}/all/${encodedEmail}`, {
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

export async function updateEmployee({ employee, image }, id) {
  const token = localStorage.getItem("jwtToken");

  const formData = new FormData();

  console.log("Datos recibidos:", { employee, image });

  formData.append(
    "employee",
    new Blob([JSON.stringify(employee)], {
      type: "application/json",
    })
  );

  if (image && typeof image !== "string") {
    formData.append("image", image);
  }

  console.log("Contenido de FormData:");
  for (let [key, value] of formData.entries()) {
    if (key === "employee") {
      value.text().then((text) => console.log(key, text));
    } else {
      console.log(key, value);
    }
  }

  return await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
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
