import { ON_TRANSACTION } from "./types";

export const transactionAction = data => {
    return {
        type: ON_TRANSACTION,
        payload: data
    }
}
