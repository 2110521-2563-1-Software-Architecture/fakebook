import { SET_AUTH, SET_CURRENT_USER } from "common/actionTypes";

export const login = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH,
    payload: {
      value: true,
    },
  });
};

export const logout = () => ({
  type: SET_AUTH,
  payload: {
    value: false,
  },
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: {
    user,
  },
});
