import React, { useState } from "react";
import "./EventdetailImagesPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { weddingImages } from "../assets/weddings";
import { corporateImages } from "../assets/corporate";
import { birthdayImages } from "../assets/birthdays";

function EventDetailImagesPage() {
  let images = [];
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  if (title === "Weddings") {
    images = weddingImages;
  }

  if (title === "Corporate") {
    images = corporateImages;
  }

  if (title === "Birthdays") {
    images = birthdayImages;
  }

  return (
    <section className="event-detail-page">
      <header className="event-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="event-detail-title">{decodedTitle}</h1>
        <p className="event-detail-subtitle">
          Explora nuestra galería de {decodedTitle.toLowerCase()}
        </p>
      </header>

      <div className="event-detail-container">
        {images.length > 0 ? (
          <div className="gallery-masonry">
            {images.map((image, index) => (
              <figure
                key={index}
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  className="gallery-image"
                  src={image}
                  alt={`${decodedTitle} ${index + 1}`}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-icon">🔍</span>
                </div>
              </figure>
            ))}
          </div>
        ) : (
          <p className="empty-state">
            No se encontraron imágenes para la categoría: {decodedTitle}
          </p>
        )}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Expanded view"
              className="lightbox-image"
            />
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default EventDetailImagesPage;
