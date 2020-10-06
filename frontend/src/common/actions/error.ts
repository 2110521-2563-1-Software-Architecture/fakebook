import { SET_ERROR } from "../actionTypes";
import Swal from "sweetalert2";

export const showError = (error) => {
  Swal.fire({
    title: "เกิดข้อผิดพลาด",
    text: typeof error?.errors?.message
      ? error?.errors?.message
      : "กรุณาลองใหม่อีกครั้ง",
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
