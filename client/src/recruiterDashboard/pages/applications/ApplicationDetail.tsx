
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type {
  Application,
  ApplicationStatus,
} from "../../types/application.ts";

import type {
  InterviewRound,
} from "../../types/interview.ts";

import { applicationApi } from "../../api/applicationApi.ts";

import {
  getInterviewRoundsByApplicantApi,
} from "../../api/InterviewApi.ts";

import { Icon } from "../../components/common/Icon.tsx";
import Field from "../../components/common/Field.tsx";

const statuses: ApplicationStatus[] = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Hired",
  "Rejected",
];

const ApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] =
    useState<Application | null>(null);

  const [interviewRounds, setInterviewRounds] =
    useState<InterviewRound[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadingRounds, setLoadingRounds] = useState(false);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // =====================================
  // Get Application
  // =====================================

  useEffect(() => {
    if (!id) return;

    applicationApi
      .getOne(id)
      .then(setApplication)
      .catch((err) =>
        setError(
          err?.response?.data?.message ||
            "Could not load this application.",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  // =====================================
  // Get Interview Rounds
  // =====================================

  useEffect(() => {
    if (!application?.applicantId) return;

    setLoadingRounds(true);

    getInterviewRoundsByApplicantApi(
      application.applicantId,
    )
      .then((rounds) => {
        setInterviewRounds(rounds);
      })
      .catch((err) => {
        console.error(
          "Error loading interview rounds:",
          err,
        );

        setInterviewRounds([]);
      })
      .finally(() => {
        setLoadingRounds(false);
      });
  }, [application?.applicantId]);

  // =====================================
  // Handle Status Change
  // =====================================

  const handleStatusChange = async (
    status: ApplicationStatus,
  ) => {
    if (!id || !application) return;

    setSaving(true);
    setSaved(false);

    try {
      const updated =
        await applicationApi.updateStatus(
          id,
          status,
        );

      setApplication(updated);
      setSaved(true);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Could not update status.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // Visible Interview Rounds
  // =====================================

  const visibleInterviewRounds = [
    ...interviewRounds,
  ]
    .sort((a, b) => a.round - b.round)
    .reduce<InterviewRound[]>(
      (visible, currentRound) => {
        // Stop adding rounds after a rejected round
        const alreadyRejected = visible.some(
          (round) =>
            round.status.toLowerCase() ===
            "rejected",
        );

        if (alreadyRejected) {
          return visible;
        }

        visible.push(currentRound);

        return visible;
      },
      [],
    );

  return (
    <>
      {loading ? (
        <div className="card-panel">
          <div className="empty-state">
            Loading application...
          </div>
        </div>
      ) : error && !application ? (
        <div className="card-panel">
          <div className="empty-state">
            {error}
          </div>
        </div>
      ) : application ? (
        <>
          {/* =====================================
              Application Details
          ===================================== */}

          <div className="card-panel">
            <div className="card-panel-head">
              <div>
                <h2>{application.candidateName}</h2>

                <p>
                  Applied for {application.jobTitle}
                </p>
              </div>

              <button
                className="btn btn-outline btn-sm"
                onClick={() =>
                  navigate(
                    "/recruiter-panel/applications",
                  )
                }
              >
                <Icon
                  name="chevronLeft"
                  size={14}
                />

                Back to Applications
              </button>
            </div>

            <div className="card-panel-body">
              {error && (
                <p
                  className="err"
                  style={{ marginBottom: 12 }}
                >
                  {error}
                </p>
              )}

              {saved && (
                <p
                  style={{
                    color:
                      "var(--bs-success, #198754)",
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  Status updated.
                </p>
              )}

              <div className="form-grid">
                <Field label="Candidate Name">
                  <input
                    value={
                      application.candidateName
                    }
                    disabled
                  />
                </Field>

                <Field label="Email">
                  <input
                    value={
                      application.candidateEmail
                    }
                    disabled
                  />
                </Field>

                <Field label="Phone">
                  <input
                    value={
                      application.candidatePhone
                    }
                    disabled
                  />
                </Field>

                <Field label="Applied On">
                  <input
                    value={
                      application.appliedAt
                        ? new Date(
                            application.appliedAt,
                          ).toLocaleString()
                        : "—"
                    }
                    disabled
                  />
                </Field>

                <Field
                  label="Resume"
                  span2
                >
                  {application.resumeUrl ? (
                    <a
                      href={
                        application.resumeUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      <Icon
                        name="file-text"
                        size={14}
                      />

                      View Resume
                    </a>
                  ) : (
                    <span className="cell-muted">
                      No resume uploaded
                    </span>
                  )}
                </Field>

                {application.coverLetter && (
                  <Field
                    label="Cover Letter"
                    span2
                  >
                    <textarea
                      rows={5}
                      value={
                        application.coverLetter
                      }
                      disabled
                    />
                  </Field>
                )}
              </div>
            </div>
          </div>

          {/* =====================================
              Interview Rounds
          ===================================== */}

          <div className="card-panel">
            <div className="card-panel-head">
              <div>
                <h2>Interview Rounds</h2>

                <p>
                  Candidate interview progress.
                </p>
              </div>
            </div>

            <div className="card-panel-body">
              {loadingRounds ? (
                <div className="empty-state">
                  Loading interview rounds...
                </div>
              ) : visibleInterviewRounds.length ===
                0 ? (
                <div className="empty-state">
                  No interview rounds available.
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    overflowX: "auto",
                    paddingBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      minWidth: "max-content",
                      padding: "10px 5px",
                    }}
                  >
                    {visibleInterviewRounds.map(
                      (
                        interviewRound,
                        index,
                      ) => {
                        const status =
                          interviewRound.status
                            .toLowerCase();

                        const isRejected =
                          status === "rejected";

                        const isPassed =
                          status === "passed";

                        const isLast =
                          index ===
                          visibleInterviewRounds.length -
                            1;

                        return (
                          <React.Fragment
                            key={
                              interviewRound._id
                            }
                          >
                            {/* =====================================
                                Round
                            ===================================== */}

                            <div
                              style={{
                                width: 140,
                                display: "flex",
                                flexDirection:
                                  "column",
                                alignItems:
                                  "center",
                                textAlign:
                                  "center",
                              }}
                            >
                              {/* Circle */}

                              <div
                                style={{
                                  width: 42,
                                  height: 42,
                                  borderRadius:
                                    "50%",
                                  display: "flex",
                                  alignItems:
                                    "center",
                                  justifyContent:
                                    "center",
                                  fontSize: 16,
                                  fontWeight: 600,
                                  border:
                                    isRejected
                                      ? "2px solid #dc3545"
                                      : isPassed
                                        ? "2px solid #198754"
                                        : "2px solid #0d6efd",
                                  background:
                                    isRejected
                                      ? "#fff5f5"
                                      : isPassed
                                        ? "#f0fff4"
                                        : "#f0f7ff",
                                  color:
                                    isRejected
                                      ? "#dc3545"
                                      : isPassed
                                        ? "#198754"
                                        : "#0d6efd",
                                }}
                              >
                                {isRejected
                                  ? "×"
                                  : isPassed
                                    ? "✓"
                                    : interviewRound.round}
                              </div>

                              {/* Round Name */}

                              <div
                                style={{
                                  marginTop: 8,
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color:
                                    "#212529",
                                }}
                              >
                                Round{" "}
                                {
                                  interviewRound.round
                                }
                              </div>

                              {/* Status */}

                              <div
                                style={{
                                  marginTop: 4,
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color:
                                    isRejected
                                      ? "#dc3545"
                                      : isPassed
                                        ? "#198754"
                                        : "#0d6efd",
                                }}
                              >
                                {
                                  interviewRound.status
                                }
                              </div>

                              {/* Remark */}

                              {interviewRound.remark && (
                                <div
                                  style={{
                                    marginTop: 5,
                                    fontSize: 12,
                                    color:
                                      "#6c757d",
                                    maxWidth: 130,
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {
                                    interviewRound.remark
                                  }
                                </div>
                              )}
                            </div>

                            {/* =====================================
                                Connector
                            ===================================== */}

                            {!isLast && (
                              <div
                                style={{
                                  width: 70,
                                  marginTop: 20,
                                  height: 2,
                                  background:
                                    isRejected
                                      ? "#f1aeb5"
                                      : "#b7dfc5",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </React.Fragment>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =====================================
              Update Status
          ===================================== */}

          <div className="card-panel">
            <div className="card-panel-head">
              <div>
                <h2>Update Status</h2>

                <p>
                  Move this candidate through your
                  hiring pipeline.
                </p>
              </div>
            </div>

            <div className="card-panel-body">
              <div className="form-grid">
                <Field label="Application Status">
                  <select
                    value={application.status}
                    disabled={saving}
                    onChange={(e) =>
                      handleStatusChange(
                        e.target
                          .value as ApplicationStatus,
                      )
                    }
                  >
                    {statuses.map((s) => (
                      <option
                        key={s}
                        value={s}
                      >
                        {s.charAt(0).toUpperCase() +
                          s.slice(1)}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ApplicationDetail;

