import React from "react";
import { Icon } from "@/components/common/Icon";

export interface ViewField {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

interface ViewModalProps {
  open: boolean;
  title?: string;
  fields: ViewField[];
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({
  open,
  title = "Details",
  fields,
  onClose,
}) => {
  return open ? (
    <>
      <div className="modal-backdrop fade show"></div>

      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Header */}
            <div className="modal-header px-4 py-3 border-bottom">
              <div>
                <h4 className="modal-title fw-bold mb-1">{title}</h4>
                <div className="text-muted small">View complete details</div>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <div className="row g-4">
                {fields.map((field, index) => (
                  <div
                    key={`${field.label}-${index}`}
                    className={field.fullWidth ? "col-12" : "col-md-6"}
                  >
                    <div className="mb-1 text-muted small fw-semibold">
                      {field.label}
                    </div>

                    <div
                      className="fw-medium text-dark"
                      style={{ fontSize: "15px", lineHeight: "1.6" }}
                    >
                      {field.value ?? (
                        <span className="text-muted">Not available</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer px-4 py-3 border-top">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default ViewModal;
