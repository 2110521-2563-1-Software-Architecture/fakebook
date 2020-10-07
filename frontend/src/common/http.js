import Axios from "axios";
import store from "common/store";
import { showError } from "common/actions/error";
import { logout } from "modules/auth/actions";

export default () => {
  Axios.defaults.headers.common["Content-Type"] = "application/json";
  const token = localStorage.getItem("at");
  if (token) {
    Axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      if (err.response) {
        store.dispatch(showError(err.response.data));
      }
      console.warn(err);
      if (err.status === 401) {
        store.dispatch(logout());
      }
      return Promise.reject(err);
    }
  );
};
