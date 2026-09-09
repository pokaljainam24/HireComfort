import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import { RecruiterProfile as RecruiterProfileType } from "@/types/recruiterProfile";
import { recruiterProfileApi } from "@/api/recruiterProfileApi";

const empty: RecruiterProfileType = { fullName: "", email: "", phone: "", designation: "" };

const RecruiterProfile: React.FC = () => {
  const [form, setForm] = useState<RecruiterProfileType>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    recruiterProfileApi
      .get()
      .then((profile) => setForm({ ...empty, ...profile }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setFormError("");
    setSaved(false);
    try {
      const updated = await recruiterProfileApi.update(form);
      setForm({ ...empty, ...updated });
      setSaved(true);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Recruiter Profile" section="Profile" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Your Details</h2>
            <p>This is how candidates and your team see you.</p>
          </div>
        </div>
        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">Loading profile...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {formError && <p className="err" style={{ marginBottom: 12 }}>{formError}</p>}
              {saved && (
                <p style={{ color: "var(--bs-success, #198754)", fontSize: 13, marginBottom: 12 }}>
                  Profile saved.
                </p>
              )}
              <div className="form-grid">
                <Field label="Full Name" required error={errors.fullName}>
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                  />
                </Field>
                <Field label="Designation">
                  <input
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g. HR Manager"
                  />
                </Field>
                <Field label="Email" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                </Field>
                <Field label="Phone" required error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9xxxxxxxxx"
                  />
                </Field>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default RecruiterProfile;
