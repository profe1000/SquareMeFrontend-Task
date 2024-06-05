import { useState, useEffect } from "react";
import { authRefreshSession } from "../apiservice/authService";
import { IAuthType } from "../apiservice/authService.type";
import { useAppDispatch } from "../Redux/reduxCustomHook";
import {
  getJSON,
  getString,
  storeJSON,
  storePlainString,
} from "../utils/localStorage";
import useFormatApiRequest from "./formatApiRequest";

export const USER_TOKEN_KEY = "authTokenUser";
export const USER_AUTH_DATA_KEY = "authDataUser";
export const ADMIN_TOKEN_KEY = "authTokenAdmin";
export const ADMIN_AUTH_DATA_KEY = "authDataAdmin";

const useAuth = (loadApi?: Boolean, preReqFunc?: () => void) => {
  const [tokenUser, setTokenUser] = useState<any>(null);
  const [authDataUser, setAuthDataUser] = useState<any>(null);
  const [isAutheticatedUser, setIsAutheticatedUser] = useState(true);
  const [loadUserData, setLoadUserData] = useState(false);

  const dispatch = useAppDispatch();

  // This is use to check local storage the last stored Session Variables and get them and dispatch it.
  const checkAuth = async () => {
    // User Side
    if (
      getString(USER_TOKEN_KEY) !== null ||
      getJSON(USER_AUTH_DATA_KEY) !== null
    ) {
      setIsAutheticatedUser(true);
      setTokenUser(getString(USER_TOKEN_KEY));
      setAuthDataUser(getJSON(USER_AUTH_DATA_KEY));

      dispatch({
        type: "AUTH_ADD_DATA",
        payload: getJSON(USER_AUTH_DATA_KEY),
      });
      setLoadUserData(true);
    } else {
      setIsAutheticatedUser(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isAutheticatedUser]);

  useEffect(() => {
    if (loadApi) {
      if (preReqFunc) {
        preReqFunc();
      }
      checkAuth();
    }
  }, [loadApi]);

  // A custom hook to Refresh User Data Information
  const userDataRefreshResult = useFormatApiRequest(
    () => authRefreshSession(),
    loadUserData,
    () => {
      setLoadUserData(false);
    },
    () => {
      processUserDataResult();
    }
  );

  // Process The User Data refresh Api
  const processUserDataResult = async () => {
    if (userDataRefreshResult.httpState === "SUCCESS") {
      const userRefreshResult: IAuthType = userDataRefreshResult.data;
      storePlainString(USER_TOKEN_KEY, userRefreshResult?.data?.token || "");
      storeJSON(USER_AUTH_DATA_KEY, userRefreshResult);
      dispatch({ type: "AUTH_ADD_DATA", payload: userRefreshResult });
    } else if (userDataRefreshResult.httpState === "ERROR") {
      console.log("Session Login Error");
    }
  };

  return {
    isAutheticatedUser,
    authDataUser,
    tokenUser,
  };
};

export default useAuth;
