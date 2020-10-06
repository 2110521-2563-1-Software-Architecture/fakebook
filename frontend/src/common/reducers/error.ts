import { SET_ERROR } from "../actionTypes";

const initialState = {
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    }
    default:
      return state;
  }
}
