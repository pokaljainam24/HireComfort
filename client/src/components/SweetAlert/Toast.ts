import Swal from "sweetalert2";

const toast = {
    success: (message: string) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            width: "420px",
            padding: "16px 20px",

            customClass: {
                popup: "hc-toast-success",
                title: "hc-toast-success-title",
                icon: "hc-toast-success-icon",
                timerProgressBar: "hc-toast-success-progress",
            },
        });
    },

    error: (message: string) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            width: "420px",
            padding: "16px 20px",

            customClass: {
                popup: "hc-toast-error",
                title: "hc-toast-error-title",
                icon: "hc-toast-error-icon",
                timerProgressBar: "hc-toast-error-progress",
            },
        });
    },

    warning: (message: string) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: message,
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            width: "420px",
            padding: "16px 20px",

            customClass: {
                popup: "hc-toast-warning",
                title: "hc-toast-warning-title",
                icon: "hc-toast-warning-icon",
                timerProgressBar: "hc-toast-warning-progress",
            },
        });
    },

    info: (message: string) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "info",
            title: message,
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            width: "420px",
            padding: "16px 20px",

            customClass: {
                popup: "hc-toast-info",
                title: "hc-toast-info-title",
                icon: "hc-toast-info-icon",
                timerProgressBar: "hc-toast-info-progress",
            },
        });
    },
};

export default toast;