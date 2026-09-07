import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ViewModal, { ViewField } from "@/components/common/ViewModal";

import {
  getStates,
  getStateById,
} from "@/api/stateApi";

import type { State } from "@/types/state";

import { showError } from "@/utils/swal";

// =====================================
// COMPONENT
// =====================================

const StateMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<State[]>([]);

  const [viewTarget, setViewTarget] = useState<State | null>(null);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getStates();

      setRows(data);
    } catch (error) {
      console.error("Error loading states:", error);

      showError("Failed to load states");
    } finally {
      setLoading(false);
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

  const handleView = async (row: State) => {
    try {
      setLoading(true);

      const state = await getStateById(row.id);

      setViewTarget(state);
    } catch (error) {
      console.error("Error loading state:", error);

      showError("Failed to load state details");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<State>[] = [
    {
      header: "ID",
      render: (row) => <div>{row.id}</div>,
    },

    {
      header: "State",
      render: (row) => (
        <div>
          <b>{row.name}</b>
        </div>
      ),
    },

    {
      header: "Country ID",
      render: (row) => (
        <div className="cell-muted">{row.country_id}</div>
      ),
    },

    {
      header: "ISO2",
      render: (row) => (
        <div className="cell-muted">{row.iso2}</div>
      ),
    },

    {
      header: "ISO3166-2",
      render: (row) => (
        <div className="cell-muted">{row.iso3166_2}</div>
      ),
    },

    {
      header: "Type",
      render: (row) => (
        <div className="cell-muted">{row.type}</div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: State): ViewField[] => [
    {
      label: "ID",
      value: row.id,
    },

    {
      label: "State Name",
      value: row.name,
      fullWidth: true,
    },

    {
      label: "Country ID",
      value: row.country_id,
    },

    {
      label: "ISO2",
      value: row.iso2,
    },

    {
      label: "ISO3166-2",
      value: row.iso3166_2,
    },

    {
      label: "Type",
      value: row.type,
    },
  ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader title="State" section="Master" />

      {/* =====================================
          DATA TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>States</h2>

            <p>{rows.length} states available</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => String(row.id)}
          searchPlaceholder="Search states..."
          onSearch={(row, query) =>
            row.name.toLowerCase().includes(query) ||
            row.iso2.toLowerCase().includes(query) ||
            row.iso3166_2.toLowerCase().includes(query) ||
            row.type.toLowerCase().includes(query) ||
            String(row.country_id).includes(query)
          }
          onView={handleView}
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="State Details"
        fields={viewTarget ? getViewFields(viewTarget) : []}
        onClose={() => setViewTarget(null)}
      />
    </>
  );
};

export default StateMaster;
