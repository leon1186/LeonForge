import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <img
        className="hero__image"
        src="https://images.pexels.com/photos/33895100/pexels-photo-33895100.jpeg"
        alt="Main photograph"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1>Leon Forge</h1>
        <p>Design, straightness and precision.</p>

        <Link to="/events">
          {" "}
          <button>See more</button>{" "}
        </Link>
      </div>
    </section>
  );
}

export default Hero;
