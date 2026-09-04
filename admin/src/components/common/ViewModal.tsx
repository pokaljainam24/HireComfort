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
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <div>
                <h5 className="modal-title mb-1">{title}</h5>

                <small className="text-muted">View complete details</small>
              </div>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>

            {/* Body */}
            <div className="modal-body">
              <div className="row g-3">
                {fields.map((field, index) => (
                  <div
                    key={`${field.label}-${index}`}
                    className={field.fullWidth ? "col-12" : "col-md-6"}
                  >
                    <div className="small text-muted fw-semibold mb-1">
                      {field.label}
                    </div>

                    <div className="border rounded p-2">
                      {field.value ?? "-"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewModal;
