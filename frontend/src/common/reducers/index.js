import { combineReducers } from "redux";

// From Common
import error from "./error";

// From Modules
import auth from "modules/auth/reducers";
import posts from "modules/posts/reducers";

export default combineReducers({ auth, posts, error });
