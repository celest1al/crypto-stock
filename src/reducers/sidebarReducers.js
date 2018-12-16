import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/types";

const initialState = {
    open: false
}

export const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {
                open: true
            }
        case CLOSE_SIDEBAR:
            return {
                open: false
            }
        default:
            return state;
    }
}
