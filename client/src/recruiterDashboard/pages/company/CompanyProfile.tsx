import React, { useEffect, useState } from "react";
import type { Country } from "../../types/country.ts";
import type { StateItem } from "../../types/state.ts";
import type { City } from "../../types/city.ts";
import { companyProfileApi } from "../../api/companyProfileApi.ts";
import { getCountries } from "../../api/countryApi.ts";
import { getStates } from "../../api/stateApi.ts";
import { getCities } from "../../api/cityApi.ts";
import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";
import type { CompanyProfileType } from "../../types/companyProfile.ts";

const empty: CompanyProfileType = {
  companyName: "",
  companyEmail: "",
  contactNumber: "",
  numberOfEmployee: "1-10",
  companyType: "Private Limited",
  website: "",
  gstNumber: "",
  companyLogo: "",
  aboutCompany: "",
  address: "",
  countryId: "",
  stateId: "",
  cityId: "",
  instagram: "",
  twitter: "",
  linkedin: "",
  facebook: "",
};

const CompanyProfile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [form, setForm] = useState<CompanyProfileType>(empty);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      companyProfileApi.get(user._id).catch(() => null),
      getCountries().catch(() => []),
      getStates().catch(() => []),
      getCities().catch(() => []),
    ]).then(([profile, countries, states, cities]) => {
      if (profile) setForm((prev) => ({ ...prev, ...profile }));
      setCountries(countries);
      setStates(states);
      setCities(cities);
      setLoading(false);
    });
  }, []);

  const filteredStates = states.filter((s) => s.country_id == form.countryId);
  const filteredCities = cities.filter((c) => c.state_id == form.stateId);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.companyEmail?.trim()) e.companyEmail = "Company email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail.trim())) e.companyEmail = "Enter a valid email address";

    if (!form.contactNumber?.trim()) e.contactNumber = "Contact number is required";
    else if (!/^[6-9]\d{9}$/.test(form.contactNumber.trim())) e.contactNumber = "Enter a valid 10-digit mobile number";

    if (!form.companyType?.trim()) e.companyType = "Company type is required";
    if (!form.numberOfEmployee?.trim()) e.numberOfEmployee = "Number of employees is required";
    if (!form.gstNumber?.trim()) e.gstNumber = "GST number is required";
    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(form.gstNumber.trim().toUpperCase())) {
      e.gstNumber = "Enter a valid 15-character GSTIN (e.g. 22AAAAA0000A1Z5)";
    }

    if (!form.address?.trim()) e.address = "Company address is required";
    if (!form.aboutCompany?.trim()) e.aboutCompany = "About company is required";

    if (!form.countryId) e.countryId = "Country is required";
    if (!form.stateId) e.stateId = "State is required";
    if (!form.cityId) e.cityId = "City is required";

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
      const updated = await companyProfileApi.save(user._id, form._id, form);
      if (updated) {
        setForm((prev) => ({
          ...prev,
          ...updated,
          countryId: updated.country !== undefined && updated.country !== null ? String(updated.country) : updated.countryId || prev.countryId,
          stateId: updated.state !== undefined && updated.state !== null ? String(updated.state) : updated.stateId || prev.stateId,
          cityId: updated.city !== undefined && updated.city !== null ? String(updated.city) : updated.cityId || prev.cityId,
        }));
      }
      setSaved(true);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || err?.response?.data?.error || err?.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Company Profile" section="Profile" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Company Details</h2>
            <p>This information is shown to candidates on every job you post.</p>
          </div>
        </div>
        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">Loading company profile...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {formError && <p className="err" style={{ marginBottom: 12 }}>{formError}</p>}
              {saved && (
                <p style={{ color: "var(--bs-success, #198754)", fontSize: 13, marginBottom: 12 }}>
                  Company profile saved successfully.
                </p>
              )}
              <div className="form-grid">
                <Field label="Company Name" required error={errors.companyName}>
                  <input
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="e.g. Acme Technologies Pvt Ltd"
                  />
                </Field>
                <Field label="Company Email" required error={errors.companyEmail}>
                  <input
                    type="email"
                    value={form.companyEmail}
                    onChange={(e) => setForm({ ...form, companyEmail: e.target.value })}
                    placeholder="contact@company.com"
                  />
                </Field>
                <Field label="Contact Number" required error={errors.contactNumber}>
                  <input
                    type="tel"
                    value={form.contactNumber}
                    onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </Field>
                <Field label="Company Type" required error={errors.companyType}>
                  <select
                    value={form.companyType}
                    onChange={(e) => setForm({ ...form, companyType: e.target.value })}
                  >
                    <option value="Private Limited">Private Limited</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLP">LLP</option>
                    <option value="NGO / Non-Profit">NGO / Non-Profit</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
                <Field label="Number of Employees" required error={errors.numberOfEmployee}>
                  <select
                    value={form.numberOfEmployee}
                    onChange={(e) => setForm({ ...form, numberOfEmployee: e.target.value })}
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </Field>
                <Field label="GST Number" required error={errors.gstNumber}>
                  <input
                    value={form.gstNumber}
                    onChange={(e) => setForm({ ...form, gstNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. 22AAAAA0000A1Z5"
                  />
                </Field>
                <Field label="Website">
                  <input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </Field>
                <Field label="Company Logo" error={errors.companyLogo}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const maxSize = 500 * 1024; // 500 KB
                        if (file.size > maxSize) {
                          setErrors((prev) => ({
                            ...prev,
                            companyLogo: "Image size must be less than 500 KB",
                          }));
                          e.target.value = "";
                          return;
                        }
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.companyLogo;
                          return copy;
                        });
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setForm((prev) => ({ ...prev, companyLogo: reader.result as string }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  {form.companyLogo && (
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 64, height: 64, borderRadius: 8, border: "1px solid #e5e7eb", padding: 4, backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        <img
                          src={form.companyLogo}
                          alt="Company Logo Preview"
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, companyLogo: "" }))}
                        style={{ fontSize: 12, color: "#dc2626", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                      >
                        Remove Logo
                      </button>
                    </div>
                  )}
                </Field>
                <Field label="Country" required error={errors.countryId}>
                  <select
                    value={form.countryId}
                    onChange={(e) => setForm({ ...form, countryId: e.target.value, stateId: "", cityId: "" })}
                  >
                    <option value="">Select country</option>
                    {countries.map((c) => (
                      <option key={c._id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="State"
                  required
                  error={errors.stateId}
                  hint={!form.countryId ? "Please select a country first" : ""}
                >
                  <select
                    value={form.stateId}
                    onChange={(e) => setForm({ ...form, stateId: e.target.value, cityId: "" })}
                    disabled={!form.countryId}
                    style={!form.countryId ? { opacity: 0.6, cursor: "not-allowed", backgroundColor: "#f3f4f6" } : {}}
                  >
                    <option value="">Select state</option>
                    {filteredStates.map((s) => (
                      <option key={s._id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="City"
                  required
                  error={errors.cityId}
                  hint={!form.countryId ? "Please select a state first" : !form.stateId ? "Please select a state first" : ""}
                >
                  <select
                    value={form.cityId}
                    onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                    disabled={!form.stateId}
                    style={!form.stateId ? { opacity: 0.6, cursor: "not-allowed", backgroundColor: "#f3f4f6" } : {}}
                  >
                    <option value="">Select city</option>
                    {filteredCities.map((c) => (
                      <option key={c._id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Instagram URL">
                  <input
                    value={form.instagram}
                    onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    placeholder="https://instagram.com/company"
                  />
                </Field>
                <Field label="Twitter URL">
                  <input
                    value={form.twitter}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                    placeholder="https://twitter.com/company"
                  />
                </Field>
                <Field label="LinkedIn URL">
                  <input
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/company/acme"
                  />
                </Field>
                <Field label="Facebook URL">
                  <input
                    value={form.facebook}
                    onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                    placeholder="https://facebook.com/company"
                  />
                </Field>
                <Field label="Address" required error={errors.address}>
                  <textarea
                    rows={5}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Office address"
                  />
                </Field>
                <Field label="About the Company" required error={errors.aboutCompany} hint="Shown to candidates on job listings">
                  <textarea
                    rows={5}
                    value={form.aboutCompany}
                    onChange={(e) => setForm({ ...form, aboutCompany: e.target.value })}
                    placeholder="Tell candidates about your company..."
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

export default CompanyProfile;
