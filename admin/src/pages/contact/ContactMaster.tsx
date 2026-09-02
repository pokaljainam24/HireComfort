import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Contact } from "@/types/contact";
import { genId } from "@/utils/id";

const seed: Contact[] = [
  {
    id: genId("ct"),
    name: "Vikram Rao",
    companyName: "Nimbus Tech",
    email: "vikram.rao@nimbustech.com",
    phoneNumber: "+91 98765 43210",
    description: "Interested in bulk hiring for our Bangalore office, please share pricing.",
    ipAddress: "103.21.244.12",
  },
  {
    id: genId("ct"),
    name: "Sara Thomas",
    companyName: "BrightPath Consulting",
    email: "sara.t@brightpath.io",
    phoneNumber: "+1 415 555 0132",
    description: "Would like a demo of the recruiter dashboard.",
    ipAddress: "172.58.90.4",
  },
];

const ContactMaster: React.FC = () => {
  const [rows, setRows] = useState<Contact[]>(seed);
  const [viewing, setViewing] = useState<Contact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);

  const columns: ColumnDef<Contact>[] = [
    {
      header: "Name",
      render: (r) => (
        <div style={{ cursor: "pointer" }} onClick={() => setViewing(r)}>
          <b>{r.name}</b>
          <div className="cell-muted" style={{ fontSize: 12 }}>
            {r.companyName}
          </div>
        </div>
      ),
    },
    { header: "Email", render: (r) => <span className="cell-muted">{r.email}</span> },
    { header: "Phone", render: (r) => r.phoneNumber },
    { header: "IP Address", render: (r) => <span className="badge badge-gray">{r.ipAddress}</span> },
  ];

  return (
    <>
      <PageHeader title="Contact Queries" section="Engagement" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Queries</h2>
            <p>Submissions from the public contact form. Click a name to view details.</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search queries..."
          onSearch={(r, q) =>
            r.name.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.companyName.toLowerCase().includes(q)
          }
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      {viewing && (
        <div className="modal-backdrop" onClick={() => setViewing(null)}>
          <div className="modal-box" style={{ width: 440 }} onClick={(e) => e.stopPropagation()}>
            <h3>{viewing.name}</h3>
            <p style={{ marginBottom: 14 }}>{viewing.companyName}</p>
            <div style={{ display: "grid", gap: 10, fontSize: 13.5 }}>
              <div>
                <b>Email:</b> {viewing.email}
              </div>
              <div>
                <b>Phone:</b> {viewing.phoneNumber}
              </div>
              <div>
                <b>IP Address:</b> {viewing.ipAddress}
              </div>
              <div>
                <b>Message:</b>
                <div className="cell-muted" style={{ marginTop: 4 }}>
                  {viewing.description}
                </div>
              </div>
            </div>
            <div className="modal-actions" style={{ marginTop: 18 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setViewing(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete query?"
        message={`The query from "${deleteTarget?.name}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          setRows((r) => r.filter((row) => row.id !== deleteTarget?.id));
          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default ContactMaster;
