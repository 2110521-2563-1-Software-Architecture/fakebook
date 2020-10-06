import { SET_AUTH } from "../actionTypes";

export const login = () => ({
  type: SET_AUTH,
  payload: {
    value: true,
  },
});

export const logout = () => ({
  type: SET_AUTH,
  payload: {
    value: false,
  },
});
