import instance from "../utils/axios.wrapper";
import { IAuthType } from "./authService.type";

export const sampleApiCall = async (body?: any) => {
  const axios = await instance("", "https://dummyjson.com/", true);
  const { data } = await axios.get("/todos");
  const result: IAuthType = await data;
  return result;
};
