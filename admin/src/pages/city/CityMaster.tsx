import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import { City } from "@/types/city";

interface ApiState {
  iso2: string;
  name: string;
}

interface ApiCity {
  id: number;
  name: string;
}

interface CityRow extends City {
  stateName: string;
}

const CityMaster: React.FC = () => {
  const [rows, setRows] = useState<CityRow[]>([]);

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<CityRow | null>(null);

  const apiKey = (
    import.meta as ImportMeta & {
      env: {
        VITE_REST_COUNTRIES_API_KEY?: string;
      };
    }
  ).env.VITE_REST_COUNTRIES_API_KEY;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        setApiError("");

        // Fetch all states of India
        const statesResponse = await fetch(
          "https://api.countrystatecity.in/v1/countries/IN/states",
          {
            headers: apiKey ? { "X-CSCAPI-KEY": apiKey } : undefined,
          },
        );

        if (!statesResponse.ok) {
          throw new Error(`Failed to fetch states: ${statesResponse.status}`);
        }

        const states: ApiState[] = await statesResponse.json();

        // Fetch cities for all states
        const cityRequests = states.map(async (state) => {
          try {
            const response = await fetch(
              `https://api.countrystatecity.in/v1/countries/IN/states/${state.iso2}/cities`,
              {
                headers: apiKey
                  ? {
                      "X-CSCAPI-KEY": apiKey,
                    }
                  : undefined,
              },
            );

            if (!response.ok) {
              console.error(
                `Failed to fetch cities for ${state.name}: ${response.status}`,
              );

              return [];
            }

            const cities: ApiCity[] = await response.json();

            return cities.map((city) => ({
              id: String(city.id),
              stateId: state.iso2,
              name: city.name,
              stateName: state.name,
            }));
          } catch (error) {
            console.error(`Error fetching cities for ${state.name}:`, error);

            return [];
          }
        });

        const results = await Promise.all(cityRequests);

        // Combine all cities
        const allCities = results.flat();

        setRows(allCities);
      } catch (error) {
        console.error("City API error:", error);

        setRows([]);

        setApiError("Unable to load cities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [apiKey]);

  const columns: ColumnDef<CityRow>[] = [
    {
      header: "City Name",
      render: (row) => <b>{row.name}</b>,
    },
    {
      header: "State",
      render: (row) => row.stateName,
    },
  ];

  return (
    <>
      <PageHeader title="City Master" section="Location Masters" />

      {/* ALL CITIES */}

      <div className="card-panel">
        <div className="card-panel-head">
          <div>
            <h2>All Cities</h2>

            <p>
              {loading
                ? "Loading cities..."
                : `${rows.length} cities configured`}
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          searchPlaceholder="Search city..."
          onSearch={(row, query) => row.name.toLowerCase().includes(query)}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {/* API ERROR */}

      {apiError && <div className="alert alert-danger">{apiError}</div>}

      {/* DELETE */}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete city?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          setRows((currentRows) =>
            currentRows.filter((row) => row.id !== deleteTarget?.id),
          );

          setDeleteTarget(null);
        }}
      />
    </>
  );
};

export default CityMaster;
