import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { Country } from "@/types/country";
import { genId } from "@/utils/id";

const empty: Omit<Country, "id"> = {
  name: "",
  code: "",
};

const CountryMaster: React.FC = () => {
  const [rows, setRows] = useState<Country[]>([]);
  const [form, setForm] = useState<Omit<Country, "id">>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries",
          {
            headers: (() => {
              const apiKey = (
                import.meta as ImportMeta & {
                  env: { VITE_REST_COUNTRIES_API_KEY?: string };
                }
              ).env.VITE_REST_COUNTRIES_API_KEY;

              return apiKey ? { "X-CSCAPI-KEY": apiKey } : undefined;
            })(),
          },
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.status}`);
        }

        const countries = await response.json();

        const mappedCountries: Country[] = countries.map(
          (country: { iso2: string; name: string }) => ({
            id: genId("cty"),
            name: country.name,
            code: country.iso2,
          }),
        );

        setRows(mappedCountries);
      } catch (error) {
        console.error("Country API error:", error);
        setApiError("Unable to load countries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) {
      e.name = "Country name is required";
    }

    if (!form.code.trim()) {
      e.code = "Country code is required";
    } else if (form.code.trim().length > 5) {
      e.code = "Use a short code (max 5 chars)";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!validate()) return;

    if (editingId) {
      setRows((r) =>
        r.map((row) =>
          row.id === editingId
            ? {
                ...row,
                ...form,
              }
            : row,
        ),
      );
    } else {
      setRows((r) => [
        {
          id: genId("cty"),
          ...form,
        },
        ...r,
      ]);
    }

    resetForm();
  };

  const columns: ColumnDef<Country>[] = [
    {
      header: "Country Name",
      render: (r) => <b>{r.name}</b>,
    },
    {
      header: "Code",
      render: (r) => <span className="badge badge-blue">{r.code}</span>,
    },
    {
      header: "ID",
      render: (r) => <span className="cell-muted">{r.id}</span>,
    },
  ];

  return (
    <>
      <PageHeader title="Country Master" section="Location Masters" />

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Countries</h2>

            <p>
              {loading
                ? "Loading countries..."
                : `${rows.length} countries configured`}
            </p>
          </div>
        </div>

        {apiError && <div className="error-message">{apiError}</div>}

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search country..."
          onSearch={(r, q) =>
            r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q)
          }
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete country?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          setRows((r) => r.filter((row) => row.id !== deleteTarget?.id));

          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default CountryMaster;
