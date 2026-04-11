import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function EventMap({ lat, lng, nombreSalon }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  // Coordenadas por defecto (Medellín si no llegan datos)
  const position = { lat: lat || 6.2442, lng: lng || -75.5812 };

  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker position={position} title={nombreSalon} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default EventMap;
