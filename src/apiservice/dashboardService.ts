import instance from "../utils/axios.wrapper";

export const addUrl = async (body: any) => {
  const axios = await instance(null, null, true);
  const { data } = await axios.post("api/v1/urls", body);
  const result = await data;
  return result;
};

export const getUrl = async () => {
  const axios = await instance(null, null, true);
  const { data } = await axios.get("api/v1/urls");
  const result = await data;
  return result;
};
