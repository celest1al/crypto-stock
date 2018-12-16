import { call, put } from "redux-saga/effects";
import {
  FETCH_CRYPTOCURRENCIES_SUCCESS,
  FETCH_CRYPTOCURRENCIES_FAILED
} from "../actions/types";
import { cryptoBaseApi } from "../apis/cryptoApi";

export function* cryptoSaga(data) {
  try {
    const result = yield call(cryptoBaseApi, data);
    if (result) {
      yield put({ type: FETCH_CRYPTOCURRENCIES_SUCCESS, payload: result });
    }
  } catch (error) {
    yield put({ type: FETCH_CRYPTOCURRENCIES_FAILED, error });
  }
}
