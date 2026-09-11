import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";

import { Contact } from "@/types/contact";

import { getContacts, deleteContact } from "@/api/contactApi.js";

// =====================================
// Contact Master
// =====================================

const ContactMaster: React.FC = () => {
  const [rows, setRows] = useState<Contact[]>([]);

  const [viewing, setViewing] = useState<Contact | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);

  const [loading, setLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // =====================================
  // Fetch Contacts
  // =====================================

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const contacts = await getContacts();

      console.log("CONTACTS:", contacts);

      setRows(Array.isArray(contacts) ? contacts : []);
    } catch (error) {
      console.error("Get Contacts Error:", error);

      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Delete Contact
  // =====================================

  const handleDelete = async () => {
    if (!deleteTarget?._id) {
      return;
    }

    try {
      setDeleteLoading(true);

      await deleteContact(deleteTarget._id);

      setRows((previousRows) =>
        previousRows.filter((row) => row._id !== deleteTarget._id),
      );

      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete Contact Error:", error);

      alert("Failed to delete contact");
    } finally {
      setDeleteLoading(false);
    }
  };

  // =====================================
  // useEffect
  // =====================================

  useEffect(() => {
    fetchContacts();
  }, []);

  // =====================================
  // Table Columns
  // =====================================

  const columns: ColumnDef<Contact>[] = [
    {
      header: "Name",

      render: (r) => (
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => setViewing(r)}
        >
          <b>{r.name}</b>

          <div
            className="cell-muted"
            style={{
              fontSize: 12,
            }}
          >
            {r.company || "-"}
          </div>
        </div>
      ),
    },

    {
      header: "Email",

      render: (r) => <span className="cell-muted">{r.email}</span>,
    },

    {
      header: "Phone",

      render: (r) => r.phone,
    },

    {
      header: "subject",

      render: (r) => (
        <span
          className="cell-muted"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            maxWidth: 300,
          }}
        >
          {r.subject}
        </span>
      ),
    },

    {
      header: "Date",

      render: (r) =>
        r.createdAt
          ? new Date(r.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-",
    },
  ];

  return (
    <>
      <PageHeader title="Contact Queries" section="Engagement" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Queries</h2>

            <p>
              Submissions from the public contact form. Click a name to view
              details.
            </p>
          </div>
        </div>

        {/* =====================================
            Loading
        ===================================== */}

        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            Loading contact queries...
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(r) => r._id}
            searchPlaceholder="Search queries..."
            onSearch={(r, q) => {
              const search = q.toLowerCase();

              return (
                r.name.toLowerCase().includes(search) ||
                r.email.toLowerCase().includes(search) ||
                r.company.toLowerCase().includes(search) ||
                r.phone.toLowerCase().includes(search) ||
                r.subject.toLowerCase().includes(search)
              );
            }}
            onDelete={(r) => setDeleteTarget(r)}
          />
        )}
      </div>

      {/* =====================================
          View Contact
      ===================================== */}

      {viewing && (
        <div className="modal-backdrop" onClick={() => setViewing(null)}>
          <div
            className="modal-box"
            style={{
              width: 500,
              maxWidth: "95%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{viewing.name}</h3>

            <p
              style={{
                marginBottom: 14,
              }}
            >
              {viewing.company || "-"}
            </p>

            <div
              style={{
                display: "grid",
                gap: 10,
                fontSize: 13.5,
              }}
            >
              <div>
                <b>Email:</b>

                <div
                  className="cell-muted"
                  style={{
                    marginTop: 4,
                  }}
                >
                  {viewing.email}
                </div>
              </div>

              <div>
                <b>Phone:</b>

                <div
                  className="cell-muted"
                  style={{
                    marginTop: 4,
                  }}
                >
                  {viewing.phone}
                </div>
              </div>

              <div>
                <b>Company:</b>

                <div
                  className="cell-muted"
                  style={{
                    marginTop: 4,
                  }}
                >
                  {viewing.company || "-"}
                </div>
              </div>

              <div>
                <b>subject:</b>

                <div
                  className="cell-muted"
                  style={{
                    marginTop: 4,
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                  }}
                >
                  {viewing.subject}
                </div>
              </div>

              <div>
                <b>Submitted:</b>

                <div
                  className="cell-muted"
                  style={{
                    marginTop: 4,
                  }}
                >
                  {viewing.createdAt
                    ? new Date(viewing.createdAt).toLocaleString("en-GB")
                    : "-"}
                </div>
              </div>
            </div>

            <div
              className="modal-actions"
              style={{
                marginTop: 18,
              }}
            >
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setViewing(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          Delete Contact
      ===================================== */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete query?"
        subject={`The query from "${
          deleteTarget?.name || ""
        }" will be permanently removed.`}
        onCancel={() => {
          if (!deleteLoading) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ContactMaster;
