const API_URL = import.meta.env.VITE_API_URL || "/api";

export const getEventS3Images = async () => {
  const response = await fetch(`${API_URL}/events/s3-images/`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las imagenes desde S3");
  }

  const data = await response.json();

  return Array.isArray(data.result) ? data.result : [];
};
