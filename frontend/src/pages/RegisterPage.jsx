import React from "react";
import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

import "./AdminPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
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

    if (
      !credentials.username ||
      !credentials.password ||
      !credentials.firstName ||
      !credentials.lastName
    ) {
      setError("Please complete all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await register(
      credentials.firstName,
      credentials.lastName,
      credentials.username,
      credentials.password,
      credentials.email,
    );

    if (result.success) {
      navigate("/panel");
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-label="Admin login form">
        <h1 className="admin-login-title">Admin Register</h1>
        <p className="admin-login-subtitle">
          Sign up to manage your dashboard.
        </p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label className="admin-login-label" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            className="admin-login-input"
            name="firstName"
            type="text"
            autoComplete="username"
            value={credentials.firstName}
            onChange={handleChange}
            placeholder="First name"
            disabled={loading}
          />

          <label className="admin-login-label" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            className="admin-login-input"
            name="lastName"
            type="text"
            autoComplete="username"
            value={credentials.lastName}
            onChange={handleChange}
            placeholder="Last name"
            disabled={loading}
          />

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
            placeholder="Username"
            disabled={loading}
          />

          <label className="admin-login-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="admin-login-input"
            name="email"
            type="email"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
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
            do you have an account?{" "}
            <a className="register-link" href="/panel">
              Login here
            </a>
          </p>

          <button
            className="admin-login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
