import React, { useState } from "react";
import { recruiterProfileApi } from "../../api/recruiterProfileApi.ts";
import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";

const ChangePassword: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!currentPassword) e.currentPassword = "Enter your current password";
    if (!newPassword) e.newPassword = "Enter a new password";
    else if (newPassword.length < 8) e.newPassword = "Use at least 8 characters";
    if (confirmPassword !== newPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (!user?._id) {
      setFormError("User session not found.");
      return;
    }
    console.log("Hello world")
    setSaving(true);
    setFormError("");
    setSaved(false);
    try {
      await recruiterProfileApi.updatePassword(user._id, {
        currentPassword,
        password: newPassword,
        confirmPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSaved(true);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "Could not change password. Check your current password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Change Password" section="Account" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Update Your Password</h2>
            <p>Your new password must be at least 6 characters.</p>
          </div>
        </div>
        <div className="card-panel-body">
          <form onSubmit={handleSubmit}>
            {formError && <p className="err" style={{ marginBottom: 12 }}>{formError}</p>}
            {saved && (
              <p style={{ color: "var(--bs-success, #198754)", fontSize: 13, marginBottom: 12 }}>
                Password changed successfully.
              </p>
            )}
            <div className="form-grid single">
              <Field label="Current Password" required error={errors.currentPassword}>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </Field>
              <Field label="New Password" required error={errors.newPassword}>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </Field>
              <Field label="Confirm New Password" required error={errors.confirmPassword}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </Field>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
