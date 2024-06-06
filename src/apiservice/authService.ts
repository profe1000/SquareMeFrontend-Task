import instance from "../utils/axios.wrapper";
import { IAuthType } from "./authService.type";

export const sampleApiCall = async (body?: any) => {
  const axios = await instance("", "https://dummyjson.com/", true);
  const { data } = await axios.get("/todos");
  const result: IAuthType = await data;
  return result;
};

export const authSignUp = async (body: any) => {
  const axios = await instance(null, null, true);
  const { data } = await axios.post("api/v1/auth/sign-up", body);
  const result: IAuthType = await data;
  return result;
};

export const authSignIn = async (body: any) => {
  const axios = await instance(null, null, true);
  const { data } = await axios.post("api/v1/auth/login", body);
  const result = await data;
  return result;
};

export const authRefreshSession = async () => {
  const axios = await instance(null, null, true);
  const { data } = await axios.get("api/v1/auth/sessions-login");
  const result = await data;
  return result;
};
