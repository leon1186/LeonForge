import { useEffect, useState } from "react";

function NewsByLocation() {
  const [news, setNews] = useState([]);
  const [country, setCountry] = useState("us"); // Por defecto US
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener la ubicación del navegador
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // 2. Convertir coordenadas a código de país (Usando una mini API gratuita)
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const geoData = await geoRes.json();
          const countryCode = geoData.address.country_code; // Devuelve "co", "ar", etc.
          setCountry(countryCode);
        } catch (err) {
          console.error("Error obteniendo país", err);
        }
      });
    }
  }, []);

  useEffect(() => {
    // 3. Llamar a NewsAPI cuando el país cambie
    const fetchNews = async () => {
      const apiKey = import.meta.env.VITE_NEWS_KEY;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error en NewsAPI", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country]); // Se dispara cuando detectamos el país

  return (
    <div className="news-section">
      <h2>Noticias en tu ubicación actual ({country.toUpperCase()})</h2>
      {loading ? (
        <p>Detectando tu ubicación y cargando noticias...</p>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{ width: "100%" }}
              />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank">
                Leer más
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsByLocation;
