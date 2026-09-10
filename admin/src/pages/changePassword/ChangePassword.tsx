import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import Field from "@/components/common/Field";
import { Icon } from "@/components/common/Icon";

import { changeAdminPassword } from "@/api/adminApi";
import { useAuth } from "@/context/AuthContext";

import Swal from "sweetalert2";

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();

    // =====================================
    // AUTH
    // =====================================

    const { logout } = useAuth();

    // =====================================
    // STATE
    // =====================================

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

    // =====================================
    // FORM CHANGE
    // =====================================

    const handleChange = (
        field: string,
        value: string,
    ) => {
        if (field === "currentPassword") {
            setCurrentPassword(value);
        }

        if (field === "newPassword") {
            setNewPassword(value);
        }

        if (field === "confirmPassword") {
            setConfirmPassword(value);
        }

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    // =====================================
    // VALIDATION
    // =====================================

    const validate = () => {
        const e: Record<string, string> = {};

        if (!currentPassword.trim()) {
            e.currentPassword =
                "Current password is required";
        }

        if (!newPassword.trim()) {
            e.newPassword =
                "New password is required";
        } else if (newPassword.length < 6) {
            e.newPassword =
                "New password must contain at least 6 characters";
        }

        if (!confirmPassword.trim()) {
            e.confirmPassword =
                "Please confirm your new password";
        } else if (newPassword !== confirmPassword) {
            e.confirmPassword =
                "New password and confirm password do not match";
        }

        if (
            currentPassword.trim() &&
            newPassword.trim() &&
            currentPassword === newPassword
        ) {
            e.newPassword =
                "New password must be different from current password";
        }

        setErrors(e);

        return Object.keys(e).length === 0;
    };

    // =====================================
    // RESET FORM
    // =====================================

    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({});
    };

    // =====================================
    // SUCCESS MODAL
    // =====================================

    const showSuccessAlert = async () => {
        return Swal.fire({
            html: `
                <div
                    id="success-modal-content"
                    style="
                        text-align: center;
                        padding: 8px 10px 2px;
                    "
                >

                    <!-- GREEN CHECK CIRCLE -->

                    <div
                        style="
                            width: 68px;
                            height: 68px;
                            margin: 0 auto 17px;
                            border-radius: 50%;
                            background: #2dbb7f;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        "
                    >
                        <span
                            style="
                                color: #ffffff;
                                font-size: 42px;
                                font-weight: 500;
                                line-height: 1;
                                font-family: Arial, sans-serif;
                                transform: translateY(-2px);
                            "
                        >
                            ✓
                        </span>
                    </div>

                    <!-- TITLE -->

                    <div
                        style="
                            color: #2dbb7f;
                            font-size: 20px;
                            font-weight: 600;
                            line-height: 1.3;
                            margin-bottom: 14px;
                            font-family: Arial, sans-serif;
                        "
                    >
                        Success!
                    </div>

                    <!-- MESSAGE -->

                    <div
                        style="
                            color: #444444;
                            font-size: 13px;
                            font-weight: 400;
                            line-height: 1.6;
                            margin: 0 auto;
                            max-width: 280px;
                            font-family: Arial, sans-serif;
                        "
                    >
                        Your password has been changed.<br />
                        Please login again.
                    </div>

                </div>
            `,

            // =====================================
            // HIDE DEFAULT BUTTON
            // =====================================

            showConfirmButton: true,

            confirmButtonText: "OKAY",

            // =====================================
            // MODAL SIZE
            // =====================================

            width: "330px",

            padding: "25px 25px 20px",

            background: "#ffffff",

            color: "#333333",

            // =====================================
            // NO ANIMATION
            // =====================================

            animation: false,

            // =====================================
            // BUTTON STYLING
            // =====================================

            buttonsStyling: false,

            customClass: {
                popup:
                    "change-password-success-popup",
                confirmButton:
                    "change-password-success-button",
            },

            // =====================================
            // INLINE STYLING
            // =====================================

            didOpen: () => {
                const popup = Swal.getPopup();

                if (popup) {
                    popup.style.borderRadius =
                        "18px";

                    popup.style.border =
                        "none";

                    popup.style.boxShadow =
                        "0 10px 35px rgba(0, 0, 0, 0.12)";

                    popup.style.overflow =
                        "hidden";
                }

                // =================================
                // OKAY BUTTON
                // =================================

                const button =
                    Swal.getConfirmButton();

                if (button) {
                    button.style.background =
                        "#2dbb7f";

                    button.style.color =
                        "#ffffff";

                    button.style.border =
                        "none";

                    button.style.borderRadius =
                        "20px";

                    button.style.width =
                        "105px";

                    button.style.height =
                        "36px";

                    button.style.padding =
                        "0";

                    button.style.fontSize =
                        "11px";

                    button.style.fontWeight =
                        "500";

                    button.style.fontFamily =
                        "Arial, sans-serif";

                    button.style.letterSpacing =
                        "0.3px";

                    button.style.cursor =
                        "pointer";

                    button.style.boxShadow =
                        "none";

                    button.style.marginTop =
                        "18px";

                    button.style.outline =
                        "none";
                }

                // =================================
                // HIDE DEFAULT FOOTER EXTRA SPACE
                // =================================

                const actions =
                    Swal.getActions();

                if (actions) {
                    actions.style.marginTop =
                        "0";

                    actions.style.padding =
                        "0";

                    actions.style.display =
                        "flex";

                    actions.style.justifyContent =
                        "center";
                }
            },
        });
    };

    // =====================================
    // ERROR ALERT
    // =====================================

    const showErrorAlert = async (
        message: string,
    ) => {
        await Swal.fire({
            icon: "error",

            title: "Password Change Failed",

            text: message,

            confirmButtonText: "Try Again",

            width: "400px",

            padding: "30px 25px",

            background: "#ffffff",

            color: "#1f2937",

            animation: false,

            buttonsStyling: false,

            customClass: {
                popup:
                    "change-password-error-popup",

                title:
                    "change-password-error-title",

                htmlContainer:
                    "change-password-error-text",

                confirmButton:
                    "change-password-error-button",
            },

            didOpen: () => {
                const popup = Swal.getPopup();

                if (popup) {
                    popup.style.borderRadius =
                        "18px";

                    popup.style.boxShadow =
                        "0 20px 60px rgba(0, 0, 0, 0.18)";

                    popup.style.border =
                        "1px solid #e5e7eb";

                    popup.style.overflow =
                        "hidden";
                }

                const icon = Swal.getIcon();

                if (icon) {
                    icon.style.width = "70px";

                    icon.style.height = "70px";

                    icon.style.borderWidth =
                        "4px";

                    icon.style.margin =
                        "5px auto 15px";
                }

                const title = Swal.getTitle();

                if (title) {
                    title.style.fontSize =
                        "23px";

                    title.style.fontWeight =
                        "700";

                    title.style.color =
                        "#111827";

                    title.style.marginBottom =
                        "8px";
                }

                const text =
                    Swal.getHtmlContainer();

                if (text) {
                    text.style.fontSize =
                        "14px";

                    text.style.color =
                        "#6b7280";

                    text.style.lineHeight =
                        "1.6";

                    text.style.marginTop =
                        "8px";
                }

                const button =
                    Swal.getConfirmButton();

                if (button) {
                    button.style.background =
                        "linear-gradient(135deg, #ef4444, #dc2626)";

                    button.style.color =
                        "#ffffff";

                    button.style.border =
                        "none";

                    button.style.borderRadius =
                        "10px";

                    button.style.padding =
                        "11px 28px";

                    button.style.fontSize =
                        "14px";

                    button.style.fontWeight =
                        "600";

                    button.style.cursor =
                        "pointer";

                    button.style.boxShadow =
                        "0 6px 15px rgba(239, 68, 68, 0.25)";

                    button.style.marginTop =
                        "12px";
                }
            },
        });
    };

    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = async (
        e: React.FormEvent,
    ) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);

            // =====================================
            // CHANGE PASSWORD API
            // =====================================

            await changeAdminPassword(
                currentPassword,
                newPassword,
            );

            // =====================================
            // CLEAR AUTH CONTEXT
            // =====================================

            logout();

            // =====================================
            // EXTRA STORAGE CLEANUP
            // =====================================

            sessionStorage.removeItem(
                "admin_panel_auth_user",
            );

            sessionStorage.removeItem(
                "admin_panel_auth_token",
            );

            localStorage.removeItem(
                "admin_panel_auth_user",
            );

            localStorage.removeItem(
                "admin_panel_auth_token",
            );

            localStorage.removeItem(
                "adminUser",
            );

            localStorage.removeItem(
                "token",
            );

            // =====================================
            // SUCCESS MODAL
            // =====================================

            const result =
                await showSuccessAlert();

            // =====================================
            // LOGIN AGAIN
            // =====================================

            if (result.isConfirmed) {
                navigate("/login", {
                    replace: true,
                });
            }
        } catch (error) {
            console.error(
                "Change password error:",
                error,
            );

            await showErrorAlert(
                error instanceof Error
                    ? error.message
                    : "Failed to change password. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================
    // UI
    // =====================================

    return (
        <>
            <PageHeader
                title="Change Password"
                section="Account"
            />

            <div className="card-panel">

                <div className="card-panel-head">

                    <div>
                        <h2>
                            Change Password
                        </h2>

                        <p>
                            Update your admin account password.
                        </p>
                    </div>

                </div>

                <div className="card-panel-body">

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="form-grid">

                            {/* CURRENT PASSWORD */}

                            <Field
                                label="Current Password"
                                required
                                error={
                                    errors.currentPassword
                                }
                            >
                                <input
                                    type="password"
                                    value={
                                        currentPassword
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "currentPassword",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Enter current password"
                                    disabled={loading}
                                />
                            </Field>

                            {/* NEW PASSWORD */}

                            <Field
                                label="New Password"
                                required
                                error={
                                    errors.newPassword
                                }
                            >
                                <input
                                    type="password"
                                    value={
                                        newPassword
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "newPassword",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Enter new password"
                                    disabled={loading}
                                />
                            </Field>

                            {/* CONFIRM PASSWORD */}

                            <Field
                                label="Confirm New Password"
                                required
                                error={
                                    errors.confirmPassword
                                }
                            >
                                <input
                                    type="password"
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            "confirmPassword",
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Confirm new password"
                                    disabled={loading}
                                />
                            </Field>

                        </div>

                        {/* ACTIONS */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={
                                    resetForm
                                }
                                disabled={loading}
                            >
                                <Icon
                                    name="x"
                                    size={15}
                                />

                                Reset
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                <Icon
                                    name="lock"
                                    size={15}
                                />

                                {loading
                                    ? "Changing Password..."
                                    : "Change Password"}
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default ChangePassword;
