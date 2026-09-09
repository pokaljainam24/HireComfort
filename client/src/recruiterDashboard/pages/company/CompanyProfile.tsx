import React, { useEffect, useState } from "react";
import type { Country } from "../../types/country.ts";
import type { StateItem } from "../../types/state.ts";
import type { City } from "../../types/city.ts";
import { companyProfileApi } from "../../api/companyProfileApi.ts";
import { countryApi } from "../../api/countryApi.ts";
import { stateApi } from "../../api/stateApi.ts";
import { cityApi } from "../../api/cityApi.ts";
import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";
import type { CompanyProfileType } from "../../types/companyProfile.ts";

const empty: CompanyProfileType = {
  companyName: "",
  website: "",
  industry: "",
  companySize: "",
  countryId: "",
  stateId: "",
  cityId: "",
  address: "",
  about: "",
};

const CompanyProfile: React.FC = () => {
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
      companyProfileApi.get().catch(() => null),
      countryApi.getAll().catch(() => []),
      stateApi.getAll().catch(() => []),
      cityApi.getAll().catch(() => []),
    ]).then(([profile, c, s, ci]) => {
      if (profile) setForm({ ...empty, ...profile });
      setCountries(c);
      setStates(s);
      setCities(ci);
      setLoading(false);
    });
  }, []);

  const filteredStates = states.filter((s) => s.countryId === form.countryId);
  const filteredCities = cities.filter((c) => c.stateId === form.stateId);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.companyName.trim()) e.companyName = "Company name is required";
    if (!form.industry.trim()) e.industry = "Industry is required";
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
      const updated = await companyProfileApi.update(form);
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
                  Company profile saved.
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
                <Field label="Website">
                  <input
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </Field>
                <Field label="Industry" required error={errors.industry}>
                  <input
                    value={form.industry}
                    onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    placeholder="e.g. IT Services"
                  />
                </Field>
                <Field label="Company Size">
                  <select
                    value={form.companySize}
                    onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </Field>
                <Field label="Country">
                  <select
                    value={form.countryId}
                    onChange={(e) => setForm({ ...form, countryId: e.target.value, stateId: "", cityId: "" })}
                  >
                    <option value="">Select country</option>
                    {countries.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="State">
                  <select
                    value={form.stateId}
                    onChange={(e) => setForm({ ...form, stateId: e.target.value, cityId: "" })}
                    disabled={!form.countryId}
                  >
                    <option value="">Select state</option>
                    {filteredStates.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="City">
                  <select
                    value={form.cityId}
                    onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                    disabled={!form.stateId}
                  >
                    <option value="">Select city</option>
                    {filteredCities.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Address" span2>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Office address"
                  />
                </Field>
                <Field label="About the Company" span2 hint="Shown to candidates on job listings">
                  <textarea
                    rows={4}
                    value={form.about}
                    onChange={(e) => setForm({ ...form, about: e.target.value })}
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
