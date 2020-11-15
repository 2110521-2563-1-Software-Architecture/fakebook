import Axios from "axios";
import store from "common/store";
import { showError } from "common/actions/error";
import { logout } from "modules/auth/actions";

export default () => {
  Axios.defaults.headers.common["Content-Type"] = "application/json";
  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      if (err.response.status === 403 || err.response.status === 401) {
        if (store.getState().auth.loggedIn) {
          store.dispatch(
            showError({
              errors: {
                message: err.response.data,
              },
            })
          );
        }
        store.dispatch(logout());
      } else {
        if (err.response) {
          store.dispatch(
            showError({
              errors: {
                message: err.response.data,
              },
            })
          );
        }
      }
      return Promise.reject(err);
    }
  );
};
