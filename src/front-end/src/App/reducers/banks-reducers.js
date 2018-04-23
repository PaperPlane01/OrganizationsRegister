import {banksActionsConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const bankSelectReducer = (state = {
    pending: false,
    data: {
        dataSource: null,
        selectedOption: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case banksActionsConstants.FETCH_BANKS_BY_NAME:
            return {...state, pending: true};
        case banksActionsConstants.BANKS_FETCHED:
            return {...state, data: {...state.data, dataSource: action.banks}};
        case banksActionsConstants.BANK_SELECTED:
            return {...state, data: {...state.data, selectedOption: action.selectedBankOption}};
        default:
            return state;
    }
};

export const banksSearchReducer = (state = {
    pending: false,
    searchResults: null
}, action) => {
    switch (action.type) {
        case banksActionsConstants.BANKS_SEARCH_SUCCESS:
            return {...state, searchResults: action.banks};
        default: return state;
    }
};

export const bankValidationReducer = (state = {
    validationResults: {
        nameValidationResult: new ValidationResult(true, ''),
        addressValidationResult: new ValidationResult(true, '')
    }
}, action) => {
    switch (action.type) {
        case banksActionsConstants.BANK_NAME_VALIDATED:
            return {...state, validationResults: {...state.validationResults, nameValidationResult: action.nameValidationResult}};
        case banksActionsConstants.BANK_ADDRESS_VALIDATED:
            return {...state, validationResults: {...state.validationResults, addressValidationResult: action.addressValidationResult}};
        default:
            return state;
    }
};

export const bankPageReducer = (state = {
    bank: null,
    error: null,
    pending: false
}, action) => {
    switch (action.type) {
        case banksActionsConstants.FETCH_BANK_BY_ID:
            return {...state, pending: true};
        case banksActionsConstants.BANK_FETCHED:
            return {...state, pending: false, error: null, bank: action.bank};
        case banksActionsConstants.BANK_NOT_FOUND:
            return {...state, pending: false, error: action.error};
        default:
            return state;
    }
};