import { SET_AUTH, SET_CURRENT_USER } from "common/actionTypes";

const initialState = {
  loggedIn: undefined,
  currentUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH: {
      const { value } = action.payload;
      return {
        ...state,
        loggedIn: value,
      };
    }
    case SET_CURRENT_USER: {
      const { user } = action.payload;
      return {
        ...state,
        currentUser: user,
      };
    }
    default:
      return state;
  }
}
