import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getInquiryById,
  deleteInquiry,
  updateInquiry,
} from "../services/inquiryService";
import "./InquiryDetailPage.css";
import ConfirmModal from "../components/ConfirmModal";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  event_type: "",
  event_date: "",
  event_time: "",
  location: "",
  guests: "",
  comments: "",
  status: "Pending",
};

function InquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "update" o "delete"

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const data = await getInquiryById(id);

        setInquiry(data);
        setFormData({
          name: data.name ?? "",
          email: data.email ?? "",
          event_type: data.event_type ?? "",
          event_date: data.event_date ?? "",
          event_time: data.event_time ?? "",
          location: data.location ?? "",
          guests: data.guests ?? "",
          comments: data.comments ?? "",
          status: data.status ?? "Pending",
        });
      } catch (error) {
        console.error("Error loading inquiry detail:", error);
      }
    };

    fetchInquiry();
  }, [id]);

  if (!inquiry) {
    return (
      <div className="inquiry-detail-page">
        <div className="inquiry-detail-card">
          <p className="inquiry-detail-state">Inquiry not found.</p>
          <button
            className="inquiry-detail-back"
            onClick={() => navigate("/dashboard")}
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const confirmAction = async () => {
    try {
      if (actionType === "update") {
        await updateInquiry(id, {
          name: formData.name,
          email: formData.email,
          event_type: formData.event_type,
          event_date: formData.event_date,
          event_time: formData.event_time,
          location: formData.location,
          guests: formData.guests === "" ? null : Number(formData.guests),
          comments: formData.comments,
          status: formData.status,
        });
      } else if (actionType === "delete") {
        await deleteInquiry(id);
      }
    } catch (error) {
      console.error(
        `Error ${actionType === "update" ? "updating" : "deleting"} inquiry:`,
        error,
      );
    }
    navigate("/dashboard");
  };

  return (
    <div className="inquiry-detail-page">
      <div className="inquiry-detail-card">
        <div className="inquiry-detail-header">
          <button
            className="inquiry-detail-back"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
          <h1>Inquiry #{inquiry.id}</h1>
        </div>

        <div className="inquiry-detail-grid">
          <label className="inquiry-field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="inquiry-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="inquiry-field">
            <span>Event Type</span>
            <input
              type="text"
              name="event_type"
              value={formData.event_type}
              onChange={handleChange}
            />
          </label>

          <label className="inquiry-field">
            <span>Event Date</span>
            <input
              type="date"
              name="event_date"
              value={formData.event_date}
              onChange={handleChange}
            />
          </label>

          <label className="inquiry-field">
            <span>Event Time</span>
            <input
              type="time"
              name="event_time"
              value={formData.event_time}
              onChange={handleChange}
            />
          </label>

          <label className="inquiry-field">
            <span>Location</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label className="inquiry-field">
            <span>Guests</span>
            <input
              type="number"
              min="0"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="comment-section">
          <label className="" htmlFor="admin-comment">
            Comment:
          </label>
          <textarea
            id="admin-comment"
            name="admin-comment"
            rows="4"
            placeholder="Add your comment here..."
            value={formData.comments}
            onChange={(e) =>
              setFormData((previousData) => ({
                ...previousData,
                comments: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="actions">
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="inquiry-status-select"
          >
            <option value="Refused">Refused</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted </option>
          </select>
          <div className="buttons">
            <button
              className="save-btn"
              onClick={() => {
                setActionType("update");
                setShowModal(true);
              }}
            >
              Save
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                setActionType("delete");
                setShowModal(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        message={`Are you sure you want to ${actionType === "update" ? "update" : "delete"} this inquiry?`}
        onConfirm={confirmAction}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default InquiryDetailPage;
