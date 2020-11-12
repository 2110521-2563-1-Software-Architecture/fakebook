import { SET_CHOSEN_POST, UNSET_CHOSEN_POST } from "common/actionTypes";

const initialState = {
  chosenPost: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CHOSEN_POST: {
      const { post } = action.payload;
      return {
        ...state,
        chosenPost: post,
      };
    }
    case UNSET_CHOSEN_POST: {
      return {
        ...state,
        chosenPost: null,
      };
    }
    default:
      return state;
  }
}
