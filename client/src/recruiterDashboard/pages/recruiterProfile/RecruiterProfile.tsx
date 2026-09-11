import React, { useEffect, useState } from "react";
import { recruiterProfileApi } from "../../api/recruiterProfileApi.ts";
import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";
import type { RecruiterProfileType } from "../../types/recruiterProfile.ts";

const empty: RecruiterProfileType = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  address: "",
  userName: "",
  department: "",
  designation: ""
};

const RecruiterProfile: React.FC = () => {
  const [form, setForm] = useState<RecruiterProfileType>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user._id) {
      recruiterProfileApi
        .get(user._id)
        .then((profile) => {
          setForm({ ...empty, ...profile });
        })
        .catch(() => { })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!form.firstName.trim()) {
      e.firstName = "First name is required";
    } else if (!nameRegex.test(form.firstName.trim())) {
      e.firstName = "First name can only contain letters and spaces";
    }

    if (!form.lastName.trim()) {
      e.lastName = "Last name is required";
    } else if (!nameRegex.test(form.lastName.trim())) {
      e.lastName = "Last name can only contain letters and spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!emailRegex.test(form.email.trim())) {
      e.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!form.mobileNumber.trim()) {
      e.mobileNumber = "Mobile number is required";
    } else if (!phoneRegex.test(form.mobileNumber.trim().replace(/\s/g, ""))) {
      e.mobileNumber = "Enter a valid 10 digit mobile number";
    }

    const usernameRegex = /^[a-zA-Z0-9_.]+$/;
    if (!form.userName.trim()) {
      e.userName = "Username is required";
    } else if (form.userName.trim().length < 3) {
      e.userName = "Username must be at least 3 characters long";
    } else if (!usernameRegex.test(form.userName.trim())) {
      e.userName = "Username can only contain letters, numbers, underscores, and dots";
    }

    if (form.password && form.password.length < 6) {
      e.password = "Password must be at least 6 characters long";
    }

    if (!form.designation.trim()) {
      e.designation = "Designation is required";
    } else if (form.designation.trim().length < 2) {
      e.designation = "Designation must be at least 2 characters long";
    }

    if (!form.department.trim()) {
      e.department = "Department is required";
    }

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
      const updated = await recruiterProfileApi.update(user._id, form);
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
                <Field label="First Name" required error={errors.firstName}>
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="e.g. Priya"
                  />
                </Field>
                <Field label="Last Name" required error={errors.lastName}>
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="e.g. Sharma"
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
                <Field label="Mobile Number" required error={errors.mobileNumber}>
                  <input
                    value={form.mobileNumber}
                    onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                    placeholder="+91 9xxxxxxxxx"
                  />
                </Field>
                <Field label="Username" required error={errors.userName}>
                  <input
                    value={form.userName}
                    onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    placeholder="e.g. priya.hr"
                  />
                </Field>
                <Field label="Designation" required error={errors.designation}>
                  <input
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    placeholder="e.g. HR Manager"
                  />
                </Field>
                <Field label="Department" required error={errors.department}>
                  <input
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="e.g. Human Resources"
                  />
                </Field>
                <Field label="Address" span2>
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Your address"
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

