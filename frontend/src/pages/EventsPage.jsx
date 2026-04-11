import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEventS3Images } from "../services/eventService";
import "./EventsPage.css";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  console.log(weather);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const eventImages = await getEventS3Images();

        setEvents(eventImages.slice(0, 3));
      } catch (err) {
        setError(err.message || "Failed to load images");
      } finally {
        setIsLoading(false);
      }
    };

    const loadWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=25.7617&longitude=-80.1918&current_weather=true",
        );
        const data = await response.json();
        setWeather(data.current_weather);
      } catch (err) {
        console.error("Error loading weather:", err);
      }
    };

    loadImages();
    loadWeather();
  }, []);

  return (
    <section className="event-page" aria-labelledby="events-heading">
      <header className="events-header">
        <h1 className="events-intro">
          Discover our celebrations, experiences, and special gatherings.
        </h1>

        {weather && (
          <div className="weather-widget">
            <span>Miami: {weather.temperature}°C</span>
            <span className="weather-dot"></span>
            <span>
              {weather.weathercode === 0 ? "Sunny" : "Perfect for events"}
            </span>
          </div>
        )}
      </header>

      <div className="events-container">
        {isLoading && <p className="events-status">Loading images...</p>}
        {!isLoading && error && (
          <p className="events-status events-status--error">{error}</p>
        )}
        {!isLoading && !error && events.length === 0 && (
          <p className="events-status">No images available in S3.</p>
        )}
        {!isLoading && !error && events.length > 0 && (
          <div className="events-grid">
            {events.map((event) => {
              const { key: eventKey, ...eventProps } = event;
              return (
                <EventCard key={eventKey || event.title} {...eventProps} />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsPage;
