import React, { useEffect, useState } from "react";
import {
  getApplicantByIdApi,
  updateApplicantApi,
} from "../../api/applicantProfileApi.ts";
import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";
import type { ApplicantProfileType } from "../../types/applicantProfile.ts";



const empty: ApplicantProfileType = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  resume: "",
  profilePic: "",
  HighestQualification: "",
  experience: "",
  skills: [],
  preferredLocation: [],
  address: "",
  state: "",
  userName: "",
  password: "",
  dob: undefined,
  gender: "",
  isActive: true,
  isDisplay: true,
  createdAt: new Date(),
  createdBy: "",
  updatedAt: new Date(),
  updatedBy: "",
  deleteAt: null,
  deleteBy: null,
};

const ApplicantProfile: React.FC = () => {
 const  [resume,setResume] = useState<File | null>(null);
  const [form, setForm] = useState<ApplicantProfileType>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);


  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (user._id) {
      getApplicantByIdApi(user._id)
        .then((profile) => {
          setForm({
            ...empty,
            ...profile,
            skills: profile.skills || [],
            preferredLocation: profile.preferredLocation || [],
          });
        })
        .catch(() => {
          setFormError("Unable to load applicant profile.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setFormError("Applicant ID not found.");
    }
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};

    const nameRegex = /^[A-Za-z\s]+$/;

    // First Name
    if (!form.firstName.trim()) {
      e.firstName = "First name is required";
    } else if (!nameRegex.test(form.firstName.trim())) {
      e.firstName = "First name can only contain letters and spaces";
    }

    // Last Name
    if (!form.lastName.trim()) {
      e.lastName = "Last name is required";
    } else if (!nameRegex.test(form.lastName.trim())) {
      e.lastName = "Last name can only contain letters and spaces";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!emailRegex.test(form.email.trim())) {
      e.email = "Please enter a valid email address";
    }

    // Mobile Number
    const phoneRegex = /^[0-9]{10}$/;
    const mobile = form.mobileNumber.trim().replace(/\s/g, "");

    if (!form.mobileNumber.trim()) {
      e.mobileNumber = "Mobile number is required";
    } else if (!phoneRegex.test(mobile)) {
      e.mobileNumber = "Enter a valid 10 digit mobile number";
    }

    // Username
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;

    if (!form.userName.trim()) {
      e.userName = "Username is required";
    } else if (form.userName.trim().length < 3) {
      e.userName = "Username must be at least 3 characters long";
    } else if (!usernameRegex.test(form.userName.trim())) {
      e.userName =
        "Username can only contain letters, numbers, underscores, and dots";
    }

    // Highest Qualification
    if (!form.HighestQualification.trim()) {
      e.HighestQualification = "Highest qualification is required";
    }

    // Experience
    if (!form.experience?.trim()) {
      e.experience = "Experience is required";
    }

    // Gender
    if (!form.gender?.trim()) {
      e.gender = "Gender is required";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) {
      return;
    }

    if (!user._id) {
      setFormError("Applicant ID not found.");
      return;
    }

    setSaving(true);
    setFormError("");
    setSaved(false);

    try {
      const updated = await updateApplicantApi(user._id, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobileNumber: form.mobileNumber,
        resume: form.resume,
        profilePic: form.profilePic,
        HighestQualification: form.HighestQualification,
        experience: form.experience,
        skills: form.skills,
        preferredLocation: form.preferredLocation,
        address: form.address,
        state: form.state,
        userName: form.userName,
        dob: form.dob,
        gender: form.gender,
      });

      setForm({
        ...form,
        ...updated,
        skills: updated.skills || [],
        preferredLocation: updated.preferredLocation || [],
      });

      setSaved(true);
    } catch (err: any) {
      setFormError(
        err?.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const getDateValue = (date?: Date) => {
    if (!date) {
      return "";
    }

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return "";
    }

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <PageHeader title="Applicant Profile" section="Profile" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Your Details</h2>
            <p>This is how recruiters and companies see you.</p>
          </div>
        </div>

        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">Loading profile...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {formError && (
                <p
                  className="err"
                  style={{ marginBottom: 12 }}
                >
                  {formError}
                </p>
              )}

              {saved && (
                <p
                  style={{
                    color: "var(--bs-success, #198754)",
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  Profile saved.
                </p>
              )}

              <div className="form-grid">
                {/* First Name */}
                <Field
                  label="First Name"
                  required
                  error={errors.firstName}
                >
                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        firstName: e.target.value,
                      })
                    }
                    placeholder="e.g. Priya"
                  />
                </Field>

                {/* Last Name */}
                <Field
                  label="Last Name"
                  required
                  error={errors.lastName}
                >
                  <input
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        lastName: e.target.value,
                      })
                    }
                    placeholder="e.g. Sharma"
                  />
                </Field>

                {/* Email */}
                <Field
                  label="Email"
                  required
                  error={errors.email}
                >
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@example.com"
                  />
                </Field>

                {/* Mobile Number */}
                <Field
                  label="Mobile Number"
                  required
                  error={errors.mobileNumber}
                >
                  <input
                    value={form.mobileNumber}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        mobileNumber: e.target.value,
                      })
                    }
                    placeholder="10 digit mobile number"
                  />
                </Field>

                {/* Username */}
                <Field
                  label="Username"
                  required
                  error={errors.userName}
                >
                  <input
                    value={form.userName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        userName: e.target.value,
                      })
                    }
                    placeholder="e.g. priya123"
                  />
                </Field>

                {/* Highest Qualification */}
                <Field
                  label="Highest Qualification"
                  required
                  error={errors.HighestQualification}
                >
                  <input
                    value={form.HighestQualification}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        HighestQualification: e.target.value,
                      })
                    }
                    placeholder="e.g. M.Tech"
                  />
                </Field>

                {/* Experience */}
                <Field
                  label="Experience"
                  required
                  error={errors.experience}
                >
                  <input
                    value={form.experience || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        experience: e.target.value,
                      })
                    }
                    placeholder="e.g. 2 years"
                  />
                </Field>
               <Field label="Resume" span2>
                     <input
                       type="file"
                       accept=".pdf,.doc,.docx"
                       onChange={(e) => {
                         const resume = e.target.files?.[0];
                   
                         if (resume) {
                           setResume(resume);
                         }
                       }}
                     />
                   
                     {form.resume && (
                       <div style={{ marginTop: 8 }}>
                         <a
                           href={form.resume}
                           target="_blank"
                           rel="noopener noreferrer"
                         >
                           View Current Resume
                         </a>
                       </div>
                     )}
                 </Field>

                {/* Gender */}
                <Field
                  label="Gender"
                  required
                  error={errors.gender}
                >
                  <select
                    value={form.gender || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        gender: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                {/* Date of Birth */}
                <Field label="Date of Birth">
                  <input
                    type="date"
                    value={getDateValue(form.dob)}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        dob: e.target.value
                          ? new Date(`${e.target.value}T00:00:00`)
                          : undefined,
                      })
                    }
                  />
                </Field>

                {/* State */}
                <Field label="State">
                  <input
                    value={form.state || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        state: e.target.value,
                      })
                    }
                    placeholder="e.g. Gujarat"
                  />
                </Field>

                {/* Address */}
                <Field label="Address" span2>
                  <input
                    value={form.address || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        address: e.target.value,
                      })
                    }
                    placeholder="Your address"
                  />
                </Field>

                {/* Skills */}
                <Field label="Skills" span2>
                  <input
                    value={(form.skills || []).join(", ")}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        skills: e.target.value
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="e.g. React, Node.js, MongoDB"
                  />
                </Field>

                {/* Preferred Location */}
                <Field label="Preferred Location" span2>
                  <input
                    value={(form.preferredLocation || []).join(", ")}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        preferredLocation: e.target.value
                          .split(",")
                          .map((location) => location.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="e.g. Ahmedabad, Mumbai, Bangalore"
                  />
                </Field>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
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

export default ApplicantProfile;