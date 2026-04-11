import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getEventS3Images } from "../services/eventService";
import "./EventsPage.css";
import EventMap from "../components/EventMap";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

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
      // 1. Intentamos obtener la ubicación del usuario
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // 2. Llamamos a la API con las coordenadas dinámicas
              const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`,
              );
              const data = await response.json();
              setWeather(data.current_weather);
            } catch (err) {
              console.error("Error fetching weather:", err);
            }
          },
          (geoError) => {
            console.error("Geolocation error:", geoError);
            // Opcional: Podrías cargar un clima por defecto aquí si el usuario niega el permiso
          },
        );
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
            {/* Cambié "Miami" por "Local" ya que ahora es dinámico */}
            <span>Local Weather: {weather.temperature}°C</span>
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
      <br />
      <h3 style={{ color: "white" }}>Vizcaya Museum & Gardens</h3>
      <EventMap
        lat={25.7444}
        lng={-80.2103}
        nombreSalon="Vizcaya Museum & Gardens"
      />

      <hr style={{ margin: "20px 0", borderColor: "#444" }} />

      <h3 style={{ color: "white" }}>Mana Wynwood</h3>
      <EventMap lat={25.8015} lng={-80.1995} nombreSalon="Mana Wynwood" />

      <hr style={{ margin: "20px 0", borderColor: "#444" }} />

      <h3 style={{ color: "white" }}>The Moore - Design District</h3>
      <EventMap
        lat={25.813}
        lng={-80.1911}
        nombreSalon="The Moore - Design District"
      />
    </section>
  );
}

export default EventsPage;
