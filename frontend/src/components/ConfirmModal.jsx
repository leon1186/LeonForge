import React from "react";
import "./ConfirmModal.css";

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="overlay">
      <div className="modal">
        <h3>Confirm</h3>
        <p>{message}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
