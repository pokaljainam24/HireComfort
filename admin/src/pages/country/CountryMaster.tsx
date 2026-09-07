import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import {
  getCountries,
  getCountryById,
} from "@/api/CountryApi";

import type { Country } from "@/types/country";

import { showError } from "@/utils/swal";

// =====================================
// COMPONENT
// =====================================

const CountryMaster: React.FC = () => {
  // =====================================
  // STATE
  // =====================================

  const [rows, setRows] = useState<Country[]>([]);

  const [viewTarget, setViewTarget] = useState<Country | null>(null);

  const [loading, setLoading] = useState(false);

  // =====================================
  // LOAD DATA
  // =====================================

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getCountries();

      setRows(data);
    } catch (error) {
      console.error("Error loading countries:", error);

      showError("Failed to load countries");
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

  const handleView = async (row: Country) => {
    try {
      setLoading(true);

      const country = await getCountryById(row.id);

      setViewTarget(country);
    } catch (error) {
      console.error("Error loading country:", error);

      showError("Failed to load country details");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // TABLE
  // =====================================

  const columns: ColumnDef<Country>[] = [
    {
      header: "ID",
      render: (row) => <div>{row.id}</div>,
    },

    {
      header: "Country",
      render: (row) => (
        <div>
          <b>{row.name}</b>
        </div>
      ),
    },

    {
      header: "ISO2",
      render: (row) => (
        <div className="cell-muted">{row.iso2}</div>
      ),
    },

    {
      header: "ISO3",
      render: (row) => (
        <div className="cell-muted">{row.iso3}</div>
      ),
    },

    {
      header: "Phone Code",
      render: (row) => (
        <div className="cell-muted">{row.phonecode}</div>
      ),
    },

    {
      header: "Capital",
      render: (row) => (
        <div className="cell-muted">{row.capital}</div>
      ),
    },

    {
      header: "Currency",
      render: (row) => (
        <div className="cell-muted">{row.currency}</div>
      ),
    },
  ];

  // =====================================
  // VIEW FIELDS
  // =====================================

  const getViewFields = (row: Country): ViewField[] => [
    {
      label: "ID",
      value: row.id,
    },

    {
      label: "Country Name",
      value: row.name,
      fullWidth: true,
    },

    {
      label: "ISO2",
      value: row.iso2,
    },

    {
      label: "ISO3",
      value: row.iso3,
    },

    {
      label: "Phone Code",
      value: row.phonecode,
    },

    {
      label: "Capital",
      value: row.capital,
    },

    {
      label: "Currency",
      value: row.currency,
    },
  ];

  // =====================================
  // UI
  // =====================================

  return (
    <>
      <PageHeader title="Country" section="Master" />

      {/* =====================================
          DATA TABLE
      ===================================== */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>Countries</h2>

            <p>{rows.length} countries available</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
         rowKey={(row) => String(row.id)}
          searchPlaceholder="Search countries..."
          onSearch={(row, query) =>
            row.name.toLowerCase().includes(query) ||
            row.iso2.toLowerCase().includes(query) ||
            row.iso3.toLowerCase().includes(query) ||
            row.capital.toLowerCase().includes(query) ||
            row.currency.toLowerCase().includes(query)
          }
          // onView={handleView}
        />
      </div>

      {/* =====================================
          VIEW MODAL
      ===================================== */}

      <ViewModal
        open={!!viewTarget}
        title="Country Details"
        fields={viewTarget ? getViewFields(viewTarget) : []}
        onClose={() => setViewTarget(null)}
      />
    </>
  );
};

export default CountryMaster;
