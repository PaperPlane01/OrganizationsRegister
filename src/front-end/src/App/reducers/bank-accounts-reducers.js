import {bankAccountsActionsConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const bankAccountsSearchReducer = (state = {
    pending: false,
    searchResults: null,
    error: null
}, action) => {
    switch (action.type) {
        case bankAccountsActionsConstants.SEARCH_BANK_ACCOUNTS:
            return {...state, pending: true};
        case bankAccountsActionsConstants.BANK_ACCOUNTS_SEARCH_SUCCESS:
            return {...state, pending: false, searchResults: action.bankAccounts, error: null};
        case bankAccountsActionsConstants.BANK_ACCOUNT_UPDATE_FAILURE:
            return {...state, pending: false, error: action.error};
        default:
            return state;
    }
};

export const bankAccountPageReducer = (state = {
    pending: false,
    bankAccount: null,
    error: null
}, action) => {
    switch (action.type) {
        case bankAccountsActionsConstants.FETCH_BANK_ACCOUNT:
            return {...state, pending: true};
        case bankAccountsActionsConstants.BANK_ACCOUNT_FETCHED:
            return {...state, pending: false, bankAccount: action.bankAccount, error: null};
        case bankAccountsActionsConstants.BANK_ACCOUNT_FETCH_FAILURE:
            return {...state, pending: false, error: null, bankAccount: null};
        default:
            return state;
    }
};

export const bankAccountSavingReducer = (state = {
    pending: false,
    savedBankAccount: null,
    error: null
}, action) => {
    switch (action.type) {
        case bankAccountsActionsConstants.SAVE_BANK_ACCOUNT:
            return {...state, pending: true};
        case bankAccountsActionsConstants.BANK_ACCOUNT_SAVING_SUCCESS:
            return {...state, pending: false, savedBankAccount: action.savedBankAccount, error: null};
        case bankAccountsActionsConstants.BANK_ACCOUNT_SAVING_FAILURE:
            return {...state, pending: false, error: action.error, savedBankAccount: null};
        default:
            return state;
    }
};

export const bankAccountUpdateReducer = (state = {
    pending: false,
    updatedBankAccount: null,
    error: null
}, action) => {
    switch (action.type) {
        case bankAccountsActionsConstants.UPDATE_BANK_ACCOUNT:
            return {...state, pending: true};
        case bankAccountsActionsConstants.BANK_ACCOUNT_UPDATE_SUCCESS:
            return {...state, pending: false, updatedBankAccount: action.updatedBankAccount, error: null};
        case bankAccountsActionsConstants.BANK_ACCOUNT_UPDATE_FAILURE:
            return {...state, pending: false, error: action.error};
        default:
            return state;
    }
};

export const bankAccountValidationReducer = (state = {
    idValidationResult: new ValidationResult(true, '')
}, action) => {
    switch (action.type) {
        case bankAccountsActionsConstants.BANK_ACCOUNT_ID_VALIDATED:
            return {...state, idValidationResult: action.idValidationResult};
        default:
            return state;
    }
};