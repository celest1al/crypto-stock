import { ON_TRANSACTION } from "../actions/types";

const initialState = {
    money: 0,
    portfolio: []
}

export const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_TRANSACTION:
            return {
                money: action.payload.money,
                portfolio: action.payload.portfolio
            }
        default:
            return state;
    }
}
