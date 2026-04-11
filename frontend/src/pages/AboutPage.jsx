import "./AboutPage.css";
import photoUrl from "../assets/me.jpeg";

function AboutPage() {
  const highlights = ["Events", "Photo Booth", "Creative Direction"];

  return (
    <section className="about-page" aria-labelledby="about-title">
      <header className="about-header">
        <p className="about-kicker">Who we are</p>
        <h1 id="about-title">About Leon Forge</h1>
      </header>

      <div className="about-container">
        <figure className="photo-frame">
          <img src={photoUrl} alt="Portrait of Leon Forge" loading="lazy" />
        </figure>

        <article className="description">
          <p className="testimonial__quote">
            "Born in my beautiful Peru and based in North Florida. I earned my
            Bachelor's degree in Arts in San Francisco in 2014. Over time, I
            found my true passion: creating fun & unforgettable moments through
            photography.
            <br />
            <br />
            I've been in the Photo Booth business for over 7 years, bringing
            energy, creativity, and a personal touch to every event.
            <br />
            <br />
            When I'm not behind the camera, you'll probably find me sailing,
            hiking, snorkeling, or playing pickleball."
          </p>

          <ul className="about-highlights" aria-label="Core services">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default AboutPage;
