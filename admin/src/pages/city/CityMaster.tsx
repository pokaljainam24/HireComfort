import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ViewModal, { ViewField } from "@/components/common/ViewModal";

import {
  getCities,
  getCityById,
} from "@/api/CityApi";

import type { City } from "@/types/city";

import { showError } from "@/utils/swal";

// =====================================
// COMPONENT
// =====================================

const CityMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<City[]>([]);

  const [viewTarget, setViewTarget] = useState<City | null>(null);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getCities();

      setRows(data);
    } catch (error) {
      console.error("Error loading cities:", error);

      showError("Failed to load cities");
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

  const handleView = async (row: City) => {
    try {
      setLoading(true);

      const city = await getCityById(row.id);

      setViewTarget(city);
    } catch (error) {
      console.error("Error loading city:", error);

      showError("Failed to load city details");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<City>[] = [
    {
      header: "ID",
      render: (row) => <div>{row.id}</div>,
    },

    {
      header: "City",
      render: (row) => (
        <div>
          <b>{row.name}</b>
        </div>
      ),
    },

    {
      header: "State ID",
      render: (row) => (
        <div className="cell-muted">{row.state_id}</div>
      ),
    },

    {
      header: "Latitude",
      render: (row) => (
        <div className="cell-muted">{row.latitude}</div>
      ),
    },

    {
      header: "Longitude",
      render: (row) => (
        <div className="cell-muted">{row.longitude}</div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: City): ViewField[] => [
    {
      label: "ID",
      value: row.id,
    },

    {
      label: "City Name",
      value: row.name,
      fullWidth: true,
    },

    {
      label: "State ID",
      value: row.state_id,
    },

    {
      label: "Latitude",
      value: row.latitude,
    },

    {
      label: "Longitude",
      value: row.longitude,
    },
  ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader title="City" section="Master" />

      {/* =====================================
          DATA TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Cities</h2>

            <p>{rows.length} cities available</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
         rowKey={(row) => String(row.id)}
          searchPlaceholder="Search cities..."
          onSearch={(row, query) =>
            row.name.toLowerCase().includes(query) ||
            String(row.state_id).includes(query) ||
            row.latitude.includes(query) ||
            row.longitude.includes(query)
          }
          onView={handleView}
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="City Details"
        fields={viewTarget ? getViewFields(viewTarget) : []}
        onClose={() => setViewTarget(null)}
      />
    </>
  );
};

export default CityMaster;
