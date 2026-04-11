import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInquiry } from "../services/inquiryService";
import "./EnterInquiryPage.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  location: "",
  guests: "",
};

function EnterInquiryPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createInquiry(formData);
      setSuccess(true);
      setFormData(INITIAL_FORM);
    } catch (err) {
      setError("Could not create inquiry. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="enter-inquiry-page">
      <div className="enter-inquiry-shell">
        <header className="enter-inquiry-header">
          <span className="enter-inquiry-kicker">Dashboard</span>
          <h1>Enter Inquiries</h1>
          <p>Create a new inquiry for your account dashboard.</p>
        </header>

        <form className="enter-inquiry-form" onSubmit={handleSubmit}>
          <div className="form-field form-field--half">
            <label htmlFor="name">Client name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field form-field--half">
            <label htmlFor="email">Client email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="eventType">Event type</label>
            <input
              type="text"
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              placeholder="Wedding, birthday, corporate..."
              required
            />
          </div>

          <div className="form-field form-field--half">
            <label htmlFor="eventDate">Event date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field form-field--half">
            <label htmlFor="eventTime">Start time</label>
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field form-field--half">
            <label htmlFor="guests">Expected guests</label>
            <input
              type="number"
              min="1"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            />
          </div>

          {success && (
            <p className="form-success">
              Inquiry created successfully and linked to your user.
            </p>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="enter-inquiry-actions form-field--full">
            <button
              type="button"
              className="ghost-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to dashboard
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EnterInquiryPage;
