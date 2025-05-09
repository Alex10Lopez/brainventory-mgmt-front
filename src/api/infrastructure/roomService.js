import axios from "axios";

const API_URL = "http://localhost:8080/api/room";

export async function saveRoom({ room, image }) {
  const token = localStorage.getItem("jwtToken");

  const formData = new FormData();

  formData.append(
    "room",
    new Blob([JSON.stringify(room)], {
      type: "application/json",
    })
  );

  if (image) formData.append("image", image);

  return await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
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

export async function updateRoom({ room, image }, id) {
  const token = localStorage.getItem("jwtToken");

  const formData = new FormData();

  formData.append(
    "room",
    new Blob([JSON.stringify(room)], {
      type: "application/json",
    })
  );

  if (image && typeof image !== "string") {
    formData.append("image", image);
  }

  return await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteRoom(id) {
  const token = localStorage.getItem("jwtToken");
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function findAllRooms() {
  const token = localStorage.getItem("jwtToken");
  return await axios.get(`${API_URL}/references`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
