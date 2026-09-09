import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import { Icon } from "@/components/common/Icon";
import { Job, JobType } from "@/types/job";
import { JobCategory } from "@/types/jobCategory";
import { JobSubCategory } from "@/types/jobSubCategory";
import { Country } from "@/types/country";
import { StateItem } from "@/types/state";
import { City } from "@/types/city";
import { jobApi } from "@/api/jobApi";
import { jobCategoryApi } from "@/api/jobCategoryApi";
import { jobSubCategoryApi } from "@/api/jobSubCategoryApi";
import { countryApi } from "@/api/countryApi";
import { stateApi } from "@/api/stateApi";
import { cityApi } from "@/api/cityApi";

type FormState = Omit<Job, "_id" | "skills"> & { skills: string };

const jobTypes: JobType[] = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const empty: FormState = {
  title: "",
  categoryId: "",
  subCategoryId: "",
  jobType: "Full-time",
  countryId: "",
  stateId: "",
  cityId: "",
  minExperience: 0,
  maxExperience: 0,
  minSalary: 0,
  maxSalary: 0,
  skills: "",
  description: "",
  deadline: "",
  status: "open",
};

const PostJob: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(empty);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [subCategories, setSubCategories] = useState<JobSubCategory[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      jobCategoryApi.getAll().catch(() => []),
      jobSubCategoryApi.getAll().catch(() => []),
      countryApi.getAll().catch(() => []),
      stateApi.getAll().catch(() => []),
      cityApi.getAll().catch(() => []),
    ]).then(([cat, sub, c, s, ci]) => {
      setCategories(cat);
      setSubCategories(sub);
      setCountries(c);
      setStates(s);
      setCities(ci);
    });
  }, []);

  useEffect(() => {
    if (!id) return;
    jobApi
      .getOne(id)
      .then((job) => setForm({ ...job, skills: job.skills?.join(", ") || "" }))
      .catch(() => setFormError("Could not load this job."))
      .finally(() => setLoading(false));
  }, [id]);

  const filteredSubCategories = subCategories.filter((s) => s.categoryId === form.categoryId);
  const filteredStates = states.filter((s) => s.countryId === form.countryId);
  const filteredCities = cities.filter((c) => c.stateId === form.stateId);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.categoryId) e.categoryId = "Select a job category";
    if (!form.description.trim()) e.description = "Job description is required";
    if (!form.deadline) e.deadline = "Application deadline is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setFormError("");
    setSaved(false);
    const payload: Partial<Job> = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (isEdit && id) {
        await jobApi.update(id, payload);
      } else {
        await jobApi.create(payload);
      }
      setSaved(true);
      setTimeout(() => navigate("/manage-jobs"), 600);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title={isEdit ? "Edit Job" : "Post a Job"} section="Jobs" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>{isEdit ? "Update Job Details" : "New Job Posting"}</h2>
            <p>This will be visible to candidates once published.</p>
          </div>
        </div>
        <div className="card-panel-body">
          {loading ? (
            <div className="empty-state">Loading job...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {formError && <p className="err" style={{ marginBottom: 12 }}>{formError}</p>}
              {saved && (
                <p style={{ color: "var(--bs-success, #198754)", fontSize: 13, marginBottom: 12 }}>
                  Job {isEdit ? "updated" : "posted"}. Redirecting to Manage Jobs...
                </p>
              )}
              <div className="form-grid">
                <Field label="Job Title" required error={errors.title} span2>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </Field>
                <Field label="Job Category" required error={errors.categoryId}>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value, subCategoryId: "" })}
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Job Sub Category">
                  <select
                    value={form.subCategoryId}
                    onChange={(e) => setForm({ ...form, subCategoryId: e.target.value })}
                    disabled={!form.categoryId}
                  >
                    <option value="">Select sub category</option>
                    {filteredSubCategories.map((s) => (
                      <option key={s._id} value={s._id}>{s.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Job Type">
                  <select
                    value={form.jobType}
                    onChange={(e) => setForm({ ...form, jobType: e.target.value as JobType })}
                  >
                    {jobTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as Job["status"] })}
                  >
                    <option value="open">Open</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
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
                <Field label="Min Experience (yrs)">
                  <input
                    type="number"
                    min={0}
                    value={form.minExperience}
                    onChange={(e) => setForm({ ...form, minExperience: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Max Experience (yrs)">
                  <input
                    type="number"
                    min={0}
                    value={form.maxExperience}
                    onChange={(e) => setForm({ ...form, maxExperience: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Min Salary (per annum)">
                  <input
                    type="number"
                    min={0}
                    value={form.minSalary}
                    onChange={(e) => setForm({ ...form, minSalary: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Max Salary (per annum)">
                  <input
                    type="number"
                    min={0}
                    value={form.maxSalary}
                    onChange={(e) => setForm({ ...form, maxSalary: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Application Deadline" required error={errors.deadline}>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  />
                </Field>
                <Field label="Skills" hint="Comma separated, e.g. React, Node.js, SQL">
                  <input
                    value={form.skills}
                    onChange={(e) => setForm({ ...form, skills: e.target.value })}
                    placeholder="React, Node.js, SQL"
                  />
                </Field>
                <Field label="Job Description" required error={errors.description} span2>
                  <textarea
                    rows={6}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Responsibilities, requirements, perks..."
                  />
                </Field>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => navigate("/manage-jobs")}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  <Icon name={isEdit ? "edit" : "plus"} size={15} />
                  {saving ? "Saving..." : isEdit ? "Update Job" : "Publish Job"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PostJob;
