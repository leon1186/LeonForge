import { getAuthHeaders } from "./authService";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const createInquiry = async (formData) => {
  const payload = {
    name: formData.name,
    email: formData.email,
    event_type: formData.eventType,
    event_date: formData.eventDate,
    event_time: formData.eventTime,
    location: formData.location,
    guests: formData.guests,
  };

  const response = await fetch(`${API_URL}/inquiries/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(JSON.stringify(errors));
  }

  return response.json();
};

export const getInquiries = async () => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${API_URL}/inquiries/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(JSON.stringify(errors));
  }

  return response.json();
};

export const getInquiryById = async (id) => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(JSON.stringify(errors));
  }

  const data = await response.json();
  return data.result || data;
};

export const deleteInquiry = async (id) => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(JSON.stringify(errors));
  }
  return true;
};

export const updateInquiry = async (id, updatedData) => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(`${API_URL}/inquiries/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errors = await response.json();
    throw new Error(JSON.stringify(errors));
  }

  return response.json();
};
