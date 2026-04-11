import { useState } from "react";
import "./ContactPage.css";

const INITIAL_FORM = {
  email: "",
  commentary: "",
};

function ContactPage() {
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
      // Placeholder submit for simple contact form.
      setSuccess(true);
      setFormData(INITIAL_FORM);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-shell">
        <span className="contact-kicker">Contact</span>
        <h1>Write to us</h1>
        <p>Share your message and we will get back to you soon.</p>
        <span className="contact-meta">Email and commentary are required.</span>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="commentary">Commentary</label>
            <textarea
              id="commentary"
              name="commentary"
              value={formData.commentary}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          {success && (
            <p className="form-success">Message sent successfully.</p>
          )}

          {error && <p className="form-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
