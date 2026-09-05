import React, { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Icon } from "@/components/common/Icon";
import { StateItem } from "@/types/state";
import { genId, seedCountries, seedStates } from "@/data/seed";

const empty: Omit<StateItem, "id"> = {
  countryId: "",
  name: "",
  code: "",
};

const StateMaster: React.FC = () => {
  const [rows, setRows] = useState<StateItem[]>(seedStates);

  const [form, setForm] = useState<Omit<StateItem, "id">>(empty);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [deleteTarget, setDeleteTarget] = useState<StateItem | null>(null);

  const [loadingStates, setLoadingStates] = useState(false);

  const [apiError, setApiError] = useState("");

  const countryName = (id: string) =>
    seedCountries.find((c) => c.id === id)?.name ?? "—";

  /*
   * Fetch states from CountryStateCity API
   */
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        setApiError("");

        const cachedStates = sessionStorage.getItem("india_states");

        if (cachedStates) {
          setRows(JSON.parse(cachedStates));
          return;
        }

        const response = await fetch(
          "https://api.countrystatecity.in/v1/countries/IN/states",
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

        if (response.status === 429) {
          throw new Error("Too many API requests. Please try again later.");
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch states: ${response.status}`);
        }

        const states = await response.json();

        const india = seedCountries.find(
          (country) => country.name.toLowerCase() === "india",
        );

        if (!india) {
          throw new Error("India not found");
        }

        const apiStates: StateItem[] = states.map(
          (state: { id: string; name: string; iso2: string }) => ({
            id: `api_st_${state.iso2.toLowerCase()}`,
            countryId: india.id,
            name: state.name,
            code: state.iso2,
          }),
        );

        sessionStorage.setItem("india_states", JSON.stringify(apiStates));

        setRows(apiStates);
      } catch (error) {
        console.error("Error fetching states:", error);

        setRows(seedStates);
        setApiError("Unable to load states from API. Showing default states.");
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.countryId) {
      e.countryId = "Select a country";
    }

    if (!form.name.trim()) {
      e.name = "State name is required";
    }

    if (!form.code.trim()) {
      e.code = "State code is required";
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
          id: genId("st"),
          ...form,
        },
        ...r,
      ]);
    }

    resetForm();
  };

  const columns: ColumnDef<StateItem>[] = [
    {
      header: "State Name",
      render: (r) => <b>{r.name}</b>,
    },
    {
      header: "Code",
      render: (r) => <span className="badge badge-blue">{r.code}</span>,
    },
    {
      header: "Country",
      render: (r) => countryName(r.countryId),
    },
  ];

  return (
    <>
      <PageHeader title="State Master" section="Location Masters" />

      {/* ALL STATES */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All States</h2>

            <p>
              {loadingStates
                ? "Loading states..."
                : `${rows.length} states configured`}
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          searchPlaceholder="Search state..."
          onSearch={(r, q) =>
            r.name.toLowerCase().includes(q) || r.code.toLowerCase().includes(q)
          }
          onDelete={(r) => setDeleteTarget(r)}
        />
      </div>

      {/* DELETE */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete state?"
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

export default StateMaster;
