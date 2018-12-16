import axios from "axios";

const BASE_URL =
  "http://localhost:4444/cryptocurrencies";

export const cryptoBaseApi = data => {
  return axios.get(`${BASE_URL}?${data.payload.params}`);
};
