import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="follow-us-section">
          <h3>Follow Me</h3>
          <a
            href="https://www.instagram.com/gloria_photobooth/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/people/Gloria-PhotoBooth/61584105597683/"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <FaXTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
          </a>
        </div>

        <div className="links-section">
          <h4>Links</h4>

          <div className="links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/photo-booth">Photo Booth</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="contact-section">
          <h3>Contact Me</h3>
          <p>Email: info@leonforge.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
