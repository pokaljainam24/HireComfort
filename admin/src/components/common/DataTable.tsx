import React, { useMemo, useState } from "react";
import { Icon } from "@/components/common/Icon";

export interface ColumnDef<T> {
  header: string;
  render: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  searchPlaceholder?: string;
  onSearch?: (row: T, query: string) => boolean;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  pageSize?: number;
}

function DataTable<T>({
  columns,
  rows,
  rowKey,
  searchPlaceholder = "Search...",
  onSearch,
  onView,
  onEdit,
  onDelete,
  pageSize = 8,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim() || !onSearch) return rows;

    return rows.filter((r) => onSearch(r, query.trim().toLowerCase()));
  }, [rows, query, onSearch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const current = Math.min(page, totalPages);

  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <>
      {/* Toolbar */}

      <div className="table-toolbar">
        <div className="search-box">
          <Icon name="search" size={16} />

          <input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <span className="cell-muted" style={{ fontSize: 12.5 }}>
          {filtered.length} record
          {filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.header} style={{ width: c.width }}>
                  {c.header}
                </th>
              ))}

              {(onView || onEdit || onDelete) && (
                <th
                  style={{
                    width: 125,
                    textAlign: "right",
                  }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paged.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((c) => (
                  <td key={c.header}>{c.render(row)}</td>
                ))}

                {(onView || onEdit || onDelete) && (
                  <td>
                    <div className="cell-actions">
                      {/* View */}

                      {onView && (
                        <button
                          type="button"
                          className="icon-btn btn-sm"
                          style={{
                            width: 36,
                            height: 36,
                          }}
                          onClick={() => onView(row)}
                          aria-label="View"
                          title="View"
                        >
                          <Icon name="eye" size={20} />
                        </button>
                      )}

                      {/* Edit */}

                      {onEdit && (
                        <button
                          type="button"
                          className="icon-btn btn-sm"
                          style={{
                            width: 36,
                            height: 36,
                          }}
                          onClick={() => onEdit(row)}
                          aria-label="Edit"
                          title="Edit"
                        >
                          <Icon name="edit" size={20} />
                        </button>
                      )}

                      {/* Delete */}

                      {onDelete && (
                        <button
                          type="button"
                          className="icon-btn btn-sm"
                          style={{
                            width: 36,
                            height: 36,
                            color: "var(--bs-danger)",
                          }}
                          onClick={() => onDelete(row)}
                          aria-label="Delete"
                          title="Delete"
                        >
                          <Icon name="trash" size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {paged.length === 0 && (
          <div className="empty-state">No records found.</div>
        )}
      </div>

      {/* Pagination */}

      {filtered.length > 0 && (
        <div className="pagination-row">
          <span>
            Page {current} of {totalPages}
          </span>

          <div className="pager-btns">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={current <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <Icon name="chevronLeft" size={14} />
            </button>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={current >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <Icon name="chevronRight" size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DataTable;
