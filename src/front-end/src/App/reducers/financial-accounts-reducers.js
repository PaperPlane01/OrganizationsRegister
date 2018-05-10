import {financialAccountsActionsConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const financialAccountSelectReducer = (state = {
    dataSource: [],
    selectedOption: null
}, action) => {
    switch (action.type) {
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNTS_FETCH_SUCCESS:
            return {...state, dataSource: action.financialAccounts};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_SELECTED:
            return {...state, selectedOption: action.selectedOption};
        case financialAccountsActionsConstants.CLEAR_FINANCIAL_ACCOUNT_SELECT:
            return {...state, selectedOption: null};
        default:
            return state;
    }
};

export const financialAccountsSearchReducer = (state = {
    error: null,
    searchResults: null
}, action) => {
    switch (action.type) {
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNTS_SEARCH_SUCCESS:
            return {...state, error: null, searchResults: action.financialAccounts};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNTS_SEARCH_FAILURE:
            return {...state, error: action.error, searchResults: null};
        default:
            return state;
    }
};

export const financialAccountAddingReducer = (state = {
    error: null,
    pending: false,
    addedFinancialAccount: null
}, action) => {
    switch (action.type) {
        case financialAccountsActionsConstants.ADD_FINANCIAL_ACCOUNT:
            return {...state, pending: true, error: null};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_ADDING_SUCCESS:
            return {...state, pending: false, error: null, addedFinancialAccount: action.addedFinancialAccount};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_ADDING_FAILURE:
            return {...state, pending: false, error: action.error, addedFinancialAccount: null};
        default:
            return state;
    }
};

export const financialAccountUpdateReducer = (state = {
    error: null,
    pending: false,
    initialFinancialAccount: null,
    updatedFinancialAccount: null
}, action) => {
    switch (action.type) {
        case financialAccountsActionsConstants.UPDATE_FINANCIAL_ACCOUNT:
            return {...state, pending: true, error: null};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_UPDATE_SUCCESS:
            return {...state, pending: false, error: null, updatedFinancialAccount: action.updatedFinancialAccount};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_UPDATE_FAILURE:
            return {...state, pending: false, error: action.error, updatedFinancialAccount: null};
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_FETCH_SUCCESS:
            return {...state, pending: false, error: null, initialFinancialAccount: action.financialAccount};
        default:
            return state;
    }
};

export const financialAccountValidationReducer = (state = {
    nameValidationResult: new ValidationResult(true, '')
}, action) => {
    switch (action.type) {
        case financialAccountsActionsConstants.FINANCIAL_ACCOUNT_NAME_VALIDATED:
            return {...state, nameValidationResult: action.nameValidationResult};
        default:
            return state;
    }
};