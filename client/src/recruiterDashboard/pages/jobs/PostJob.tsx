import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import type { Job, JobType } from "../../types/job.ts";
import type { JobCategory } from "../../types/jobCategory.ts";
import type { JobSubCategory } from "../../types/jobSubCategory.ts";
import type { Country } from "../../types/country.ts";
import type { StateItem } from "../../types/state.ts";
import type { City } from "../../types/city.ts";
import { getJobCategories } from "../../api/jobCategoryApi.ts";
import { getJobSubCategories } from "../../api/jobSubCategoryApi.ts";
import { getCountries } from "../../api/countryApi.ts";
import { getStates } from "../../api/stateApi.ts";
import { getCities } from "../../api/cityApi.ts";
import { jobApi } from "../../api/jobApi.ts";
import PageHeader from "../../components/common/PageHeader.tsx";
import Field from "../../components/common/Field.tsx";
import { Icon } from "../../components/common/Icon.tsx";

type FormState = Omit<Job, "_id" | "skills"> & { skills: string };

const jobTypes: JobType[] = ["Full Time", "Part Time", "Contract", "Internship", "Freelance"];

const empty: FormState = {
  title: "",
  categoryId: "",
  subCategoryId: "",
  jobType: "Full Time",
  countryId: "",
  stateId: "",
  cityId: "",
  salaryRange: 0,
  skills: "",
  description: "",
  deadline: "",
  status: "open",
  recruiterId: "",
  exp: 0,
  nop: 0,
  qualification: ""
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
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    Promise.all([
      getJobCategories().catch(() => []),
      getJobSubCategories().catch(() => []),
      getCountries().catch(() => []),
      getStates().catch(() => []),
      getCities().catch(() => []),
    ]).then(([cat, sub, c, s, ci]) => {
      console.log(sub)
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
      .then((job: any) => {
        const catId = typeof job.categoryId === "object" ? job.categoryId?._id : job.categoryId;
        const subCatId = typeof job.subCategoryId === "object" ? job.subCategoryId?._id : job.subCategoryId;
        const formattedDeadline = job.deadline
          ? job.deadline.split("T")[0]
          : job.lastAppliedDate
            ? job.lastAppliedDate.split("T")[0]
            : "";

        setForm({
          ...empty,
          ...job,
          categoryId: catId || "",
          subCategoryId: subCatId || "",
          countryId: job.country !== undefined && job.country !== null ? String(job.country) : job.countryId || "",
          stateId: job.state !== undefined && job.state !== null ? String(job.state) : job.stateId || "",
          cityId: job.city !== undefined && job.city !== null ? String(job.city) : job.cityId || "",
          deadline: formattedDeadline,
          skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || ""
        });
      })
      .catch(() => setFormError("Could not load this job."))
      .finally(() => setLoading(false));
  }, [id]);

  const filteredSubCategories = subCategories.filter((s) => s.categoryId === form.categoryId);
  const filteredStates = states.filter((s) => s.country_id == form.countryId);
  const filteredCities = cities.filter((c) => c.state_id == form.stateId);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) {
      e.title = "Job title is required";
    } else if (form.title.trim().length < 5) {
      e.title = "Job title must be at least 5 characters long";
    }

    if (!form.categoryId) {
      e.categoryId = "Select a job category";
    }

    if (!form.countryId) e.countryId = "Country is required";
    if (!form.stateId) e.stateId = "State is required";
    if (!form.cityId) e.cityId = "City is required";

    const plainDescription = form.description.replace(/<[^>]*>/g, "").trim();
    if (!plainDescription) {
      e.description = "Job description is required";
    } else if (plainDescription.length < 20) {
      e.description = "Job description must be at least 20 characters long for clarity";
    }

    if (!form.deadline) {
      e.deadline = "Application deadline is required";
    } else {
      const selectedDate = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignore time for comparison
      if (isNaN(selectedDate.getTime())) {
        e.deadline = "Please enter a valid date";
      } else if (selectedDate < today) {
        e.deadline = "Application deadline cannot be in the past";
      }
    }

    if (form.salaryRange < 0) {
      e.salary = "Salary cannot be negative";
    }

    if (form.nop <= 0) {
      e.nop = "Number of positions must be greater than 0";
    }

    if (!form.qualification) {
      e.qualification = "Qualification is required";
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
    const payload: Partial<Job> = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      recruiterId: user._id,
      exp: Number(form.exp),
      nop: Number(form.nop),
      salaryRange: Number(form.salaryRange),
      city: Number(form.cityId),
      state: Number(form.stateId),
      country: Number(form.countryId),
      lastAppliedDate: form.deadline,
      interviewType: "Offline"
    };
    try {
      if (isEdit && id) {
        await jobApi.update(id, payload);
      } else {
        await jobApi.create(payload);
      }
      setSaved(true);
      setTimeout(() => navigate("/recruiter-panel/manage-jobs"), 600);
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
                <Field label="Number of Positions" required error={errors.nop}>
                  <input
                    type="number"
                    min={1}
                    value={form.nop}
                    onChange={(e) => setForm({ ...form, nop: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Qualification" required error={errors.qualification}>
                  <input
                    type="text"
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    placeholder="e.g., Bachelor's Degree in Computer Science"
                  />
                </Field>
                <Field label="Min Experience (yrs)">
                  <input
                    type="number"
                    min={0}
                    value={form.exp}
                    onChange={(e) => setForm({ ...form, exp: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Approximate Salary (per annum)" error={errors.salary}>
                  <input
                    type="number"
                    min={0}
                    value={form.salaryRange}
                    onChange={(e) => setForm({ ...form, salaryRange: Number(e.target.value) })}
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
                <Field label="Job Description" required error={errors.description} span3>
                  <Editor
                    apiKey={
                      (
                        import.meta as ImportMeta & {
                          env: {
                            VITE_TINYMCE_API_KEY?: string;
                          };
                        }
                      ).env.VITE_TINYMCE_API_KEY
                    }
                    value={form.description}
                    onEditorChange={(content: string) =>
                      setForm({ ...form, description: content })
                    }
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "charmap",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "table",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic underline | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | " +
                        "link table | " +
                        "removeformat | code fullscreen",
                      content_style:
                        "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; }",
                    }}
                  />
                </Field>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => navigate("/recruiter-panel/manage-jobs")}>
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
