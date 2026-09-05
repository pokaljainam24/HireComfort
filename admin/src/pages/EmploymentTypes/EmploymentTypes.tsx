import React, { useEffect, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import DataTable, { ColumnDef } from "@/components/common/DataTable";
import ConfirmModal from "@/components/common/ConfirmModal";
import ViewModal, { ViewField } from "@/components/common/ViewModal";
import { Icon } from "@/components/common/Icon";

import {
    EmploymentType,
    EmploymentTypeForm
} from "@/types/EmploymentTypes";

import {
    getEmploymentTypes,
    createEmploymentType,
    updateEmploymentType,
    deleteEmploymentType
} from "@/api/EmploymentTypesApi";

import { showSuccess, showError } from "@/utils/swal";

// =====================================
// EMPTY FORM
// =====================================

const empty: EmploymentTypeForm = {
    EmploymentName: "",
    EmploymentType:""
};

// =====================================
// COMPONENT
// =====================================

const Employment: React.FC = () => {
    // =====================================
    // STATE
    // =====================================

    const [rows, setRows] = useState<EmploymentType[]>([]);
    const [form, setForm] = useState<EmploymentTypeForm>(empty);

    const [editingId, setEditingId] = useState<number | null>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [deleteTarget, setDeleteTarget] =
        useState<EmploymentType | null>(null);

    const [viewTarget, setViewTarget] =
        useState<EmploymentType | null>(null);

    const [loading, setLoading] = useState(false);

    // =====================================
    // LOAD DATA
    // =====================================

    const loadData = async () => {
        try {
            setLoading(true);

            const employmentTypes =
                await getEmploymentTypes();

            setRows(employmentTypes ?? []);
        } catch (error) {
            console.error(
                "Error loading employment types:",
                error
            );

            showError(
                "Something went wrong while loading employment types"
            );
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
    // RESET
    // =====================================

    const resetForm = () => {
        setForm(empty);
        setEditingId(null);
        setErrors({});
    };

    // =====================================
    // VALIDATION
    // =====================================

    const validate = () => {
        const e: Record<string, string> = {};

        // =====================================
        // EMPLOYMENT NAME
        // =====================================

        if (!form.EmploymentName.trim()) {
            e.EmploymentName =
                "Employment name is required";
        } else if (
            form.EmploymentName.trim().length < 2
        ) {
            e.EmploymentName =
                "Employment name must contain at least 2 characters";
        }


    // =====================================
    // EMPLOYMENT TYPE
    // =====================================

    if (!form.EmploymentType.trim()) {
        e.EmploymentType =
            "Employment type is required";
    }

        setErrors(e);

        return Object.keys(e).length === 0;
    };

    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = async (
        ev: React.FormEvent
    ) => {
        ev.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);

            // =====================================
            // UPDATE
            // =====================================

            if (editingId !== null) {
                const updated =
                    await updateEmploymentType(
                        editingId,
                        form
                    );

                setRows((rows) =>
                    rows.map((row) =>
                        row.EmploymentTypeId === editingId
                            ? updated
                            : row
                    )
                );

                showSuccess(
                    "Employment type updated successfully"
                );
            }

            // =====================================
            // CREATE
            // =====================================

            else {
                const created =
                    await createEmploymentType(form);

                setRows((rows) => [
                    created,
                    ...rows
                ]);

                showSuccess(
                    "Employment type added successfully"
                );
            }

            resetForm();
        } catch (error) {
            console.error(
                "Error saving employment type:",
                error
            );

            showError(
                "Something went wrong while saving employment type"
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================
    // EDIT
    // =====================================

    const handleEdit = (
        row: EmploymentType
    ) => {
        setEditingId(
            row.EmploymentTypeId
        );

        setForm({
            EmploymentName:
                row.EmploymentName,
            EmploymentType:
                row.EmploymentType,
        });

        

        setErrors({});
    };

    // =====================================
    // DELETE
    // =====================================

    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setLoading(true);

            await deleteEmploymentType(
                deleteTarget.EmploymentTypeId
            );

            setRows((rows) =>
                rows.filter(
                    (row) =>
                        row.EmploymentTypeId !==
                        deleteTarget.EmploymentTypeId
                )
            );

            setDeleteTarget(null);

            showSuccess(
                "Employment type deleted successfully"
            );
        } catch (error) {
            console.error(
                "Error deleting employment type:",
                error
            );

            showError(
                "Something went wrong while deleting employment type"
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================
    // TABLE
    // =====================================

    const columns: ColumnDef<EmploymentType>[] = [
        {
            header: "Employment Name",
            render: (row) => (
                <div>
                    <b>
                        {row.EmploymentName}
                    </b>
                </div>
            ),
        },

        
      

        {
        header: "Employment Type",
        render: (row) => (
            <div className="cell-muted">
                {row.EmploymentType}
            </div>
           ),
        },
    ];

    // =====================================
    // VIEW FIELDS
    // =====================================

    const getViewFields = (
        row: EmploymentType
    ): ViewField[] => [
        {
            label: "Employment Name",
            value: row.EmploymentName,
            fullWidth: true,
        },

        {
            label: "Employment Type",
            value: row.EmploymentType,
            fullWidth: true,
        },

        {
            label: "Active",
            value: row.isActive
                ? "Yes"
                : "No",
        },

        {
            label: "Display",
            value: row.isDisplay
                ? "Yes"
                : "No",
        },

        {
            label: "Created By",
            value: row.createdBy || "-",
        },

        {
            label: "Created At",
            value: row.createdAt
                ? new Date(
                    row.createdAt
                ).toLocaleString()
                : "-",
        },

        {
            label: "Updated By",
            value: row.updatedBy || "-",
        },

        {
            label: "Updated At",
            value: row.updatedAt
                ? new Date(
                    row.updatedAt
                ).toLocaleString()
                : "-",
        },

        {
            label: "Delete By",
            value: row.deleteBy || "-",
        },

        {
            label: "Delete At",
            value: row.deleteAt
                ? new Date(
                    row.deleteAt
                ).toLocaleString()
                : "-",
        },
    ];

    // =====================================
    // UI
    // =====================================

    return (
        <>
            <PageHeader
                title="Employment Type"
                section="Master"
            />

            {/* =====================================
                FORM
            ===================================== */}

            <div className="card-panel">
                <div className="card-panel-head">
                    <div>
                        <h2>
                            {editingId !== null
                                ? "Edit Employment Type"
                                : "Add Employment Type"}
                        </h2>

                        <p>
                            Manage employment types.
                        </p>
                    </div>

                    {editingId !== null && (
                        <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={resetForm}
                            disabled={loading}
                        >
                            <Icon
                                name="x"
                                size={14}
                            />

                            Cancel edit
                        </button>
                    )}
                </div>

                <div className="card-panel-body">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-grid">

                            {/* EMPLOYMENT NAME */}

                            <Field
                                label="Employment Name"
                                required
                                error={
                                    errors.EmploymentName
                                }
                                span2
                            >
                                <input
                                    value={
                                        form.EmploymentName
                                    }
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            EmploymentName:
                                                e.target.value,
                                        });

                                        setErrors({
                                            ...errors,
                                            EmploymentName:
                                                "",
                                        });
                                    }}
                                    placeholder="e.g. Full Time"
                                    disabled={loading}
                                />
                            </Field>
                        </div>
                        {/* EMPLOYMENT TYPE */}

                    <Field
                        label="Employment Type"
                        required
                        error={errors.EmploymentType}
                        span2
                    >
                        <input
                            value={form.EmploymentType}
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    EmploymentType:
                                        e.target.value,
                                });
                    
                                setErrors({
                                    ...errors,
                                    EmploymentType: "",
                                });
                            }}
                            placeholder="e.g. Permanent"
                            disabled={loading}
                        />
                    </Field>

                        {/* ACTIONS */}

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={resetForm}
                                disabled={loading}
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                <Icon
                                    name={
                                        editingId !== null
                                            ? "edit"
                                            : "plus"
                                    }
                                    size={15}
                                />

                                {loading
                                    ? "Saving..."
                                    : editingId !== null
                                        ? "Update Employment Type"
                                        : "Add Employment Type"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* =====================================
                DATA TABLE
            ===================================== */}

            <div className="card-panel">
                <div className="card-panel-head">
                    <div>
                        <h2>
                            All Employment Types
                        </h2>

                        <p>
                            {rows.length} employment types available
                        </p>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    rows={rows}
                    rowKey={(row) =>
                        row.EmploymentName
                    }
                    searchPlaceholder="Search employment types..."
                    onSearch={(row, query) =>
                        row.EmploymentName
                            .toLowerCase()
                            .includes(query)
                    }
                    onView={(row) =>
                        setViewTarget(row)
                    }
                    onEdit={handleEdit}
                    onDelete={(row) =>
                        setDeleteTarget(row)
                    }
                />
            </div>

            {/* =====================================
                VIEW MODAL
            ===================================== */}

            <ViewModal
                open={!!viewTarget}
                title="Employment Type Details"
                fields={
                    viewTarget
                        ? getViewFields(viewTarget)
                        : []
                }
                onClose={() =>
                    setViewTarget(null)
                }
            />

            {/* =====================================
                DELETE MODAL
            ===================================== */}

            <ConfirmModal
                open={!!deleteTarget}
                title="Delete Employment Type?"
                message={`"${deleteTarget?.EmploymentName}" will be permanently removed.`}
                onCancel={() =>
                    setDeleteTarget(null)
                }
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Employment;



