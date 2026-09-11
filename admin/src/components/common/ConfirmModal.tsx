import React from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  subject: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, title, subject, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{subject}</p>
        <div className="modal-actions">
          <button className="btn btn-outline btn-sm" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger-soft btn-sm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
