import { useNavigate } from "react-router-dom";
import "./InquiryBar.css";

function InquiryBar({ inquiries = [] }) {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  return (
    <div className="section-inquiry">
      <h2>Inquiries Recivied</h2>
      {inquiries.length > 0 ? (
        <div className="inquiries-container">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="inquiry-item"
              onClick={() => navigate(`/dashboard/inquiries/${inquiry.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="inquiry-header">
                <span className="inquiry-name">{inquiry.name}</span>
                <span className="inquiry-date">
                  {formatDate(inquiry.created_at)}
                </span>
              </div>
              <div className="inquiry-details">
                <p>
                  <strong>Event:</strong> {inquiry.event_type}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(inquiry.event_date)}{" "}
                  {formatTime(inquiry.event_time)}
                </p>
                <p>
                  <strong>Location:</strong> {inquiry.location}
                </p>
                <p>
                  <strong>Email:</strong> {inquiry.email}
                </p>
                <p>
                  <strong>Guests:</strong> {inquiry.guests}
                </p>
                <p>
                  <strong>Status:</strong> {inquiry.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-inquiries">
          <p>No inquiries received yet.</p>
        </div>
      )}
    </div>
  );
}

export default InquiryBar;
