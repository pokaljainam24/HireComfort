import React from "react";

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  span2?: boolean;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, required, error, hint, span2, children }) => (
  <div className={"field" + (span2 ? " span-2" : "")}>
    <label>
      {label} {required && <span className="req">*</span>}
    </label>
    {children}
    {error ? <span className="err">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
  </div>
);

export default Field;
