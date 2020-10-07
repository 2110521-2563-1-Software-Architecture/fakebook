import { combineReducers } from "redux";

// From Common
import error from "./error";

// From Modules
import auth from "modules/auth/reducers";

export default combineReducers({ auth, error });
