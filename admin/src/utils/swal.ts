import Swal from "sweetalert2";

export const showSuccess = (message: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};

export const showError = (message: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showWarning = (message: string) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "warning",
    title: message,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};
