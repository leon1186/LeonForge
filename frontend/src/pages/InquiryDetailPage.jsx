import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getInquiryById,
  deleteInquiry,
  updateInquiry,
} from "../services/inquiryService";
import "./InquiryDetailPage.css";
import ConfirmModal from "../components/ConfirmModal";

function InquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "update" o "delete"

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const data = await getInquiryById(id);

        setInquiry(data);
        setStatus(data.status);
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

  const confirmAction = async () => {
    try {
      if (actionType === "update") {
        await updateInquiry(id, {
          status: status,
          comments: comments,
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
          <p>
            <strong>Name:</strong> {inquiry.name}
          </p>
          <p>
            <strong>Email:</strong> {inquiry.email}
          </p>
          <p>
            <strong>Event Type:</strong> {inquiry.event_type}
          </p>
          <p>
            <strong>Event Date:</strong> {inquiry.event_date}
          </p>
          <p>
            <strong>Event Time:</strong> {inquiry.event_time}
          </p>
          <p>
            <strong>Location:</strong> {inquiry.location}
          </p>
          <p>
            <strong>Guests:</strong> {inquiry.guests}
          </p>
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
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <div className="actions">
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
