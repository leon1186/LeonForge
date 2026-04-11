import "./Services.css";
import { useEffect, useRef } from "react";

function Services() {
  const services = [
    {
      title: "Event Planning",
      img: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg",
      description: "Planificación integral de eventos de principio a fin.",
    },
    {
      title: "Design Services",
      img: "https://images.pexels.com/photos/10751439/pexels-photo-10751439.jpeg",
      description: "Concepto visual, branding y diseño de experiencias.",
    },
    {
      title: "Production Management",
      img: "https://images.pexels.com/photos/19368581/pexels-photo-19368581.jpeg",
      description: "Coordinación técnica, logística y ejecución en sitio.",
    },
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <section className="content-section" aria-labelledby="services-title">
      <h2 id="services-title">Our Services</h2>

      <ul className="services-list">
        {services.map((service, index) => (
          <li
            key={service.title}
            ref={(el) => (cardsRef.current[index] = el)}
            className="service-card"
            style={{
              "--card-bg": `url(${service.img})`,
              "--delay": `${index * 120}ms`,
            }}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Services;
