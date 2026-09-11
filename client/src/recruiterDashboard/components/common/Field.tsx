import React from "react";

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  span2?: boolean;
  span3?: boolean;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, required, error, hint, span2, span3, children }) => (
  <div className={"field" + (span3 ? " span-3" : span2 ? " span-2" : "")}>
    <label>
      {label} {required && <span className="req">*</span>}
    </label>
    {children}
    {error ? <span className="err">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
  </div>
);

export default Field;
