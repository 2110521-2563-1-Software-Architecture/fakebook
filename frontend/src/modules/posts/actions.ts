import { SET_CHOSEN_POST, UNSET_CHOSEN_POST } from "common/actionTypes";

export const setChosenPost = (post) => async (dispatch) => {
  dispatch({
    type: SET_CHOSEN_POST,
    payload: {
      post,
    },
  });
};

export const unsetChosenPost = () => async (dispatch) => {
  dispatch({
    type: UNSET_CHOSEN_POST,
  });
};
