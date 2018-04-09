import {organizationsActionConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const organizationValidationReducer = (state = {
    validationResults: {
        addressValidationResult: new ValidationResult(true, ''),
        fullNameValidationResult: new ValidationResult(true, ''),
        shortNameValidationResult: new ValidationResult(true, ''),
        phoneNumberValidationResult: new ValidationResult(true, ''),
        founderValidationResult: new ValidationResult(true, ''),
        minNumberOfEmployeesValidationResult: new ValidationResult(true, ''),
        maxNumberOfEmployeesValidationResult: new ValidationResult(true, '')
    }
}, action) => {
    switch (action.type) {
        case organizationsActionConstants.ADDRESS_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, addressValidationResult: action.addressValidationResult
            }};
        case organizationsActionConstants.FULL_NAME_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, fullNameValidationResult: action.fullNameValidationResult
            }};
        case organizationsActionConstants.SHORT_NAME_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, shortNameValidationResult: action.shortNameValidationResult
            }};
        case organizationsActionConstants.PHONE_NUMBER_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, phoneNumberValidationResult: action.phoneNumberValidationResult
            }};
        case organizationsActionConstants.MIN_NUMBER_OF_EMPLOYEES_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, minNumberOfEmployeesValidationResult: action.minNumberOfEmployeesValidationResult
            }};
        case organizationsActionConstants.MAX_NUMBER_OF_EMPLOYEES_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, maxNumberOfEmployeesValidationResult: action.maxNumberOfEmployeesValidationResult
            }};
        case organizationsActionConstants.FOUNDER_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, founderValidationResult: action.founderValidationResult
            }};
        default:
            return state;
    }
};

export const organizationsReducer = (state = {
    pending: false,
    payload: {data: {}},
    error: null
}, action) => {
    switch (action.type) {
        case organizationsActionConstants.LOAD_ORGANIZATIONS:
            return {...state, pending: true, payload: {data: {}}, error: null};
        case organizationsActionConstants.ORGANIZATIONS_LOADING_SUCCESS:
            return {...state, pending: false,
                payload:
                    {data: {...state.payload.data, loadedOrganizations: action.organizations}},
                error: null
            };
        case organizationsActionConstants.SELECT_ORGANIZATION:
            return {...state, pending: false,
                payload:
                    {data: {...state.payload.data, selectedOrganizationOption: action.selectedOrganizationOption}},
                error: null
            };
        default:
            return state;
    }
};

export const organizationSearchReducer = (state = {
    pending: false,
    payload: {data: {}},
    error: null
}, action) => {
    switch (action.type) {
        case organizationsActionConstants.SEARCH_ORGANIZATIONS_BY_CRITERIA:
            return {...state, pending: true,
                payload:
                    {data: {...state.payload.data,
                    organizationsSearchResults: []
                }, error: null
            }};
        case organizationsActionConstants.ORGANIZATIONS_SEARCH_SUCCESS:
            return {...state, pending: false,
                payload:
                    {data: {...state.payload.data,
                        organizationsSearchResults: action.organizations
                    }, error: null}
            };
        default:
            return state;
    }
};

export const organizationPageReducer = (state = {
    pending: false,
    organization: null,
    error: null
}, action) => {
    switch (action.type) {
        case organizationsActionConstants.FIND_BY_BIN:
            return {...state, organization: null, pending: true, error: null};
        case organizationsActionConstants.ORGANIZATION_FOUND_BY_BIN:
            return {...state, pending: false, organization: action.organization, error: null};
        case organizationsActionConstants.ORGANIZATION_NOT_FOUND_BY_BIN:
            return {...state, pending: false, organization: null, error: action.exception};
        case organizationsActionConstants.FETCH_NUMBER_OF_YEARS_SINCE_REGISTRATION:
            return {...state, pending: true};
        case organizationsActionConstants.NUMBER_OF_YEARS_SINCE_REGISTRATION_FETCHED:
            return {...state, pending: false, numberOfYearsSinceRegistration: action.numberOfYearsSinceRegistration};
        default:
            return state;
    }
};