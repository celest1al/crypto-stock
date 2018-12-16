import { FETCH_CRYPTOCURRENCIES_REQUEST } from "./types";

export const fetchCryptocurrenciesAction = (data) => {
  return {
    type: FETCH_CRYPTOCURRENCIES_REQUEST,
    payload: data
  };
};
