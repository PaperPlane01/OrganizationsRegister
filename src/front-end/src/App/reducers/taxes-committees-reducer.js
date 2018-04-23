import {taxesCommitteesActionsConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const taxesCommitteesSelectReducer = (state = {
    pending: false,
    data: {
        dataSource: null,
        selectedOption: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case taxesCommitteesActionsConstants.FETCH_TAXES_COMMITTEES_BY_NAME:
            return {...state, pending: true};
        case taxesCommitteesActionsConstants.TAXES_COMMITTEES_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.taxesCommittees}};
        case taxesCommitteesActionsConstants.SELECT_TAXES_COMMITTEE:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        case taxesCommitteesActionsConstants.TAXES_COMMITTEE_SELECT_INITIALIZED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        default:
            return state;
    }
};

export const taxesCommitteesSearchRecuder = (state = {
    searchResults: null,
    error: null,
    pending: false
}, action) => {
    switch (action.type) {
        case taxesCommitteesActionsConstants.TAXES_COMMITTEES_SEARCH_SUCCESS:
            return {...state, searchResults: action.taxesCommittees}
        default: return state;
    }
};

export const taxesCommitteesValidationReducer = (state = {
    nameValidationResult: new ValidationResult(true, ''),
    addressValidationResult: new ValidationResult(true, '')
}, action) => {
    switch (action.type) {
        case taxesCommitteesActionsConstants.TAXES_COMMITTEE_NAME_VALIDATED:
            return {...state, nameValidationResult: action.nameValidationResult};
        case taxesCommitteesActionsConstants.TAXES_COMMITTEE_ADDRESS_VALIDATED:
            return {...state, addressValidationResult: action.addressValidationResult};
        default: return state;
    }
};

export const taxesCommitteePageReducer = (state = {
    taxesCommittee: null,
    error: null
}, action) => {
    switch (action.type) {
        case taxesCommitteesActionsConstants.TAXES_COMMITTEE_FETCHED:
            return {...state, taxesCommittee: action.taxesCommittee, error: null};
        case taxesCommitteesActionsConstants.TAXES_COMMITTEE_NOT_FOUND:
            return {...state, taxesCommittee: null, error: action.exception};
        default:
            return state;
    }
};