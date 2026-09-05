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

        // =====================================
        // FETCH ALL STATES OF INDIA
        // =====================================

        const statesResponse = await fetch(
          "https://api.countrystatecity.in/v1/countries/IN/states",
          {
            headers: apiKey
              ? {
                  "X-CSCAPI-KEY": apiKey,
                }
              : undefined,
          },
        );

        if (statesResponse.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }

        if (!statesResponse.ok) {
          throw new Error(`Failed to fetch states: ${statesResponse.status}`);
        }

        const states: ApiState[] = await statesResponse.json();

        // =====================================
        // FETCH CITIES STATE BY STATE
        // =====================================

        const allCities: {
          id: string;
          stateId: string;
          name: string;
          stateName: string;
        }[] = [];

        for (const state of states) {
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

            // =====================================
            // RATE LIMIT
            // =====================================

            if (response.status === 429) {
              console.warn(`Rate limit reached for ${state.name}. Waiting...`);

              // Wait 2 seconds before retry
              await new Promise((resolve) => setTimeout(resolve, 2000));

              const retryResponse = await fetch(
                `https://api.countrystatecity.in/v1/countries/IN/states/${state.iso2}/cities`,
                {
                  headers: apiKey
                    ? {
                        "X-CSCAPI-KEY": apiKey,
                      }
                    : undefined,
                },
              );

              if (!retryResponse.ok) {
                console.error(
                  `Failed to fetch cities for ${state.name}: ${retryResponse.status}`,
                );

                continue;
              }

              const retryCities: ApiCity[] = await retryResponse.json();

              allCities.push(
                ...retryCities.map((city) => ({
                  id: String(city.id),
                  stateId: state.iso2,
                  name: city.name,
                  stateName: state.name,
                })),
              );

              // Small delay before next state
              await new Promise((resolve) => setTimeout(resolve, 500));

              continue;
            }

            if (!response.ok) {
              console.error(
                `Failed to fetch cities for ${state.name}: ${response.status}`,
              );

              continue;
            }

            const cities: ApiCity[] = await response.json();

            allCities.push(
              ...cities.map((city) => ({
                id: String(city.id),
                stateId: state.iso2,
                name: city.name,
                stateName: state.name,
              })),
            );

            // =====================================
            // DELAY BETWEEN API REQUESTS
            // =====================================

            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (error) {
            console.error(`Error fetching cities for ${state.name}:`, error);
          }
        }

        // =====================================
        // SET ALL CITIES
        // =====================================

        setRows(allCities);

        console.log(`Total cities loaded: ${allCities.length}`);
      } catch (error) {
        console.error("City API error:", error);

        setRows([]);

        setApiError("Unable to load cities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (apiKey) {
      fetchCities();
    }
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
