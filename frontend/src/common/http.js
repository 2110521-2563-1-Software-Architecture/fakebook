import Axios from "axios";
import store from "common/store";
import { showError } from "common/actions/error";

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
      console.log("err", err);
      console.log("err.status", err.status);
      if (err.response) {
        store.dispatch(showError(err.response.data));
      }
      return Promise.reject(err);
    }
  );
};
