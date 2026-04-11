import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard =
    location.pathname === "/dashboard" ||
    location.pathname.startsWith("/dashboard/inquiries/");

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Leon Forge</div>
      {isDashboard ? (
        <div className="navbar-links">
          <Link to="/dashboard/inquiries/new">Enter inquiries</Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/panel">Login</Link>
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
      )}
    </nav>
  );
}

export default Navbar;
