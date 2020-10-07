import { SET_ERROR } from "../actionTypes";
import Swal from "sweetalert2";

export const showError = (error) => {
  Swal.fire({
    title: "An Error Occurred",
    text: typeof error?.errors?.message
      ? error?.errors?.message
      : "Please type again later.",
    icon: "error",
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
  });
  return {
    type: SET_ERROR,
    payload: {
      error,
    },
  };
};

export const hideError = () => ({
  type: SET_ERROR,
  payload: {
    error: null,
  },
});
