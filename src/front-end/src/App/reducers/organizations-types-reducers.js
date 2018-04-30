import {organizationTypesActionConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

const initialState = {
    pending: false,
    data: {
        dataSource: null,
        selectedOption: null
    },
    error: null
};

export const organizationTypeSelectReducer = (state = initialState, action) => {
    switch (action.type) {
        case organizationTypesActionConstants.FETCH_ORGANIZATION_TYPES_BY_NAME:
            return {...state, pending: true};
        case organizationTypesActionConstants.ORGANIZATION_TYPES_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.organizationTypes}, error: null};
        case organizationTypesActionConstants.ORGANIZATION_TYPE_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}, error: null};
        case organizationTypesActionConstants.ORGANIZATION_TYPE_SELECT_INITIALIZED:
            console.log('organization type select initialized action caught');
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}, error: null};
        default:
            return state;
    }
};

export const organizationTypesSearchReducer = (state = {
    error: null,
    pending: false,
    searchResults: null
}, action)  =>{
    switch (action.type) {
        case organizationTypesActionConstants.SEARCH_ORGANIZATION_TYPES:
            return {...state, pending: true};
        case organizationTypesActionConstants.ORGANIZATION_TYPES_SEARCH_SUCCESS:
            return {...state, pending: false, searchResults: action.organizationTypes, error: null};
        case organizationTypesActionConstants.ORGANIZATION_TYPES_SEARCH_FAILURE:
            return {...state, pending: false, searchResults: null, error: action.error};
        default:
            return state;
    }
};

export const organizationTypeValidationReducer = (state = {
    nameValidationResult: new ValidationResult(true, '')
}, action) => {
    switch (action.type) {
        case organizationTypesActionConstants.ORGANIZATION_TYPE_NAME_VALIDATED:
            return {...state, nameValidationResult: action.nameValidationResult};
        default:
            return state;
    }
};