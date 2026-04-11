import React from "react";
import { useNavigate } from "react-router-dom";
import "./EventCard.css";

function EventCard({image, title}) {
  const navigate = useNavigate();

  const decodedTitle = decodeURIComponent(title);

  const handleClick = () => {
    navigate(`/events/${encodeURIComponent(title)}`);
  };

  return (
    <article className="event-card" onClick={handleClick}>
      <img src={image} alt={title} loading="lazy" />
      <div className="event-card__content">
        <h3>{decodedTitle}</h3>
      </div>
    </article>
  );
}

export default EventCard;
