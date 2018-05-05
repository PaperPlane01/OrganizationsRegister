import {financialAccountsActionsConstants} from "../constants/action-constants";

export const financialAccountSelectReducer = (state = {
    dataSource: [],
    selectedOption: null
}, action) => {
    switch (action.type) {
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNTS_FETCH_SUCCESS:
            return {...state, dataSource: action.financialAccounts};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_SELECTED:
            return {...state, selectedOption: action.selectedOption};
        default:
            return state;
    }
};