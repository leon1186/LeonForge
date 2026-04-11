import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import { login } from "../services/authService";

function AdminPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!credentials.username || !credentials.password) {
      setError("Please complete username and password.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await login(credentials.username, credentials.password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-label="Admin login form">
        <h1 className="admin-login-title">Login</h1>
        <p className="admin-login-subtitle">
          Sign in to manage your dashboard.
        </p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label className="admin-login-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="admin-login-input"
            name="username"
            type="text"
            autoComplete="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="admin"
            disabled={loading}
          />

          <label className="admin-login-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="admin-login-input"
            name="password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="••••••••"
            disabled={loading}
          />

          {error ? <p className="admin-login-error">{error}</p> : null}

          <p className="admin-login-link">
            don't have an account?{" "}
            <a className="register-link" href="/register">
              Register here
            </a>
          </p>

          <button
            className="admin-login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminPage;
