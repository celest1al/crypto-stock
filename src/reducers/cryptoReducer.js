import {
  FETCH_CRYPTOCURRENCIES_REQUEST,
  FETCH_CRYPTOCURRENCIES_SUCCESS,
  FETCH_CRYPTOCURRENCIES_FAILED
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  status: null,
  data: []
};

export const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRYPTOCURRENCIES_REQUEST:
      return {
        loading: true,
        error: null,
        status: null,
        data: []
      };
    case FETCH_CRYPTOCURRENCIES_SUCCESS:
      return {
        loading: false,
        error: null,
        status: action.payload.status,
        data: [...action.payload.data]
      };
    case FETCH_CRYPTOCURRENCIES_FAILED:
      return {
        loading: false,
        ...action.payload
      };
    default:
      return state;
  }
};
