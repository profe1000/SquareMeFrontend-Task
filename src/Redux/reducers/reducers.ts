import { IAuthType } from "../../apiservice/authService.type";

export const AuthDataReducer = (state: IAuthType = {}, action) => {
  switch (action.type) {
    case "AUTH_ADD_DATA":
      return { ...state, ...action.payload };
    case "AUTH_REMOVE_DATA":
      return {};
    default:
      return state;
  }
};

export const URLLoadStateReducer = (state: boolean = false, action) => {
  switch (action.type) {
    case "CHANGE_URL_LOAD_STATE":
      return action.payload;
    case "REFRESH_LOAD_STATE":
      return false;
    default:
      return state;
  }
};
