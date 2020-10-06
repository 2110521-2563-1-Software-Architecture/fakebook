import { SET_AUTH } from "common/actionTypes";

const initialState = {
  loggedIn: undefined,
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
    default:
      return state;
  }
}
