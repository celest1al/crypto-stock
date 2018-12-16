import { combineReducers } from "redux";
import { cryptoReducer } from "./cryptoReducer";
import { transactionReducer } from "./transactionReducer";
import { sidebarReducer } from "./sidebarReducers";

const rootReducer = combineReducers({
  cryptoCurrencies: cryptoReducer,
  sidebar: sidebarReducer,
  transaction: transactionReducer
});

export default rootReducer;
