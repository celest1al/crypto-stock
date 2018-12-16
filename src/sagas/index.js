import { all, takeLatest } from "redux-saga/effects";
import { FETCH_CRYPTOCURRENCIES_REQUEST } from "../actions/types";
import { cryptoSaga } from "./cryptoSaga";

function* rootSaga() {
  yield all([takeLatest(FETCH_CRYPTOCURRENCIES_REQUEST, cryptoSaga)]);
}

export default rootSaga;
