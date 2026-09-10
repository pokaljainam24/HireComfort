
import React, { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader.tsx";
import DataTable from "../../components/common/DataTable.tsx";
import type { ColumnDef } from "../../components/common/DataTable.tsx";
import ViewModal from "../../components/common/ViewModel.tsx";
import type { ViewField } from "../../components/common/ViewModel.tsx";

import {
  getApplicantsApi,
  getApplicantByIdApi,
} from "../../api/applicantProfileApi.ts";

import type { ApplicantProfileType } from "../../types/applicantProfile.ts";

import { showError } from "../../utils/swal";

// =====================================
// COMPONENT
// =====================================

const ApplicantProfile: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<ApplicantProfileType[]>([]);

  const [viewTarget, setViewTarget] =
    useState<ApplicantProfileType | null>(null);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      const data = await getApplicantsApi();

      setRows(data);
    } catch (error) {
      console.error("Error loading applicants:", error);

      showError("Failed to load applicants");
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    loadData();
  }, []);

  // =====================================
  // VIEW
  // =====================================

  const handleView = async (row: ApplicantProfileType) => {
    try {
      const applicant = await getApplicantByIdApi(row._id);

      setViewTarget(applicant);
    } catch (error) {
      console.error("Error loading applicant:", error);

      showError("Failed to load applicant details");
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<ApplicantProfileType>[] = [
    {
      header: "ID",
      render: (row) => <div>{row._id}</div>,
    },

    {
      header: "Name",
      render: (row) => (
        <div>
          <b>
            {row.firstName} {row.lastName}
          </b>
        </div>
      ),
    },

    {
      header: "Email",
      render: (row) => (
        <div className="cell-muted">{row.email}</div>
      ),
    },

    {
      header: "Mobile",
      render: (row) => (
        <div className="cell-muted">
          {row.mobileNumber || "-"}
        </div>
      ),
    },

    {
      header: "Qualification",
      render: (row) => (
        <div className="cell-muted">
          {row.HighestQualification || "-"}
        </div>
      ),
    },

    {
      header: "Experience",
      render: (row) => (
        <div className="cell-muted">
          {row.experience || "-"}
        </div>
      ),
    },

    {
      header: "Active",
      render: (row) => (
        <div>{row.isActive ? "Yes" : "No"}</div>
      ),
    },

    {
      header: "Display",
      render: (row) => (
        <div>{row.isDisplay ? "Yes" : "No"}</div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (
    row: ApplicantProfileType
  ): ViewField[] => [
    {
      label: "Applicant ID",
      value: row._id,
    },

    {
      label: "First Name",
      value: row.firstName,
    },

    {
      label: "Last Name",
      value: row.lastName,
    },

    {
      label: "Email",
      value: row.email,
    },

    {
      label: "Mobile Number",
      value: row.mobileNumber || "-",
    },

    {
      label: "Username",
      value: row.userName,
    },

    {
      label: "Highest Qualification",
      value: row.HighestQualification || "-",
      fullWidth: true,
    },

    {
      label: "Experience",
      value: row.experience || "-",
    },

    {
      label: "Gender",
      value: row.gender || "-",
    },

    {
      label: "Date of Birth",
      value: row.dob
        ? new Date(row.dob).toLocaleDateString()
        : "-",
    },

    {
      label: "State",
      value: row.state || "-",
    },

    {
      label: "Address",
      value: row.address || "-",
      fullWidth: true,
    },

    {
      label: "Skills",
      value:
        row.skills && row.skills.length > 0
          ? row.skills.join(", ")
          : "-",
      fullWidth: true,
    },

    {
      label: "Preferred Location",
      value:
        row.preferredLocation &&
        row.preferredLocation.length > 0
          ? row.preferredLocation.join(", ")
          : "-",
      fullWidth: true,
    },

    {
      label: "Resume",
      value: row.resume || "-",
      fullWidth: true,
    },

    {
      label: "Profile Picture",
      value: row.profilePic || "-",
      fullWidth: true,
    },

    {
      label: "Active",
      value: row.isActive ? "Yes" : "No",
    },

    {
      label: "Display",
      value: row.isDisplay ? "Yes" : "No",
    },

    {
      label: "Created At",
      value: row.createdAt
        ? new Date(row.createdAt).toLocaleString()
        : "-",
    },

    {
      label: "Updated At",
      value: row.updatedAt
        ? new Date(row.updatedAt).toLocaleString()
        : "-",
    },
  ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader
        title="Applicant Profile"
        section="Applicant"
      />

      {/* =====================================
          DATA TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Applicants</h2>

            <p>{rows.length} applicants available</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => String(row._id)}
          searchPlaceholder="Search applicants..."
          onSearch={(row, query) =>
            `${row.firstName} ${row.lastName}`
              .toLowerCase()
              .includes(query) ||
            row.email
              .toLowerCase()
              .includes(query) ||
            row.userName
              .toLowerCase()
              .includes(query) ||
            String(row.mobileNumber || "").includes(query) ||
            String(row.HighestQualification || "")
              .toLowerCase()
              .includes(query) ||
            String(row.experience || "")
              .toLowerCase()
              .includes(query)
          }
          onView={handleView}
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="Applicant Details"
        fields={
          viewTarget
            ? getViewFields(viewTarget)
            : []
        }
        onClose={() => setViewTarget(null)}
      />
    </>
  );
};

export default ApplicantProfile;

