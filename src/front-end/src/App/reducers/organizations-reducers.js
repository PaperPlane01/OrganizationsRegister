import {organizationsActionConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const organizationValidationReducer = (state = {
    validationResults: {
        binValidationResult: new ValidationResult(true, ''),
        addressValidationResult: new ValidationResult(true, ''),
        fullNameValidationResult: new ValidationResult(true, ''),
        shortNameValidationResult: new ValidationResult(true, ''),
        phoneNumberValidationResult: new ValidationResult(true, ''),
        founderValidationResult: new ValidationResult(true, ''),
        minNumberOfEmployeesValidationResult: new ValidationResult(true, ''),
        maxNumberOfEmployeesValidationResult: new ValidationResult(true, ''),
        numberOfEmployeesValidationResult: new ValidationResult(true, '')
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
        case organizationsActionConstants.BIN_VALIDATED:
            return {...state, validationResults: {
                ...state.validationResults, binValidationResult: action.binValidationResult
            }};
        default:
            return state;
    }
};

export const organizationSelectReducer = (state = {
    pending: false,
    data: {
        dataSource: null,
        selectedOption: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case organizationsActionConstants.FETCH_ORGANIZATIONS_BY_NAME:
            return {...state, pending: true};
        case organizationsActionConstants.ORGANIZATIONS_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.organizations}, error: null};
        case organizationsActionConstants.ORGANIZATION_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        case organizationsActionConstants.CLEAR_ORGANIZATION_SELECT:
            return {...state, pending: false, data: {...state.data, selectedOption: null, dataSource: null}};
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
        case organizationsActionConstants.CLEAR_ORGANIZATIONS_SEARCH_PAGE_STATE:
            return {...state, payload: {data: {}}, pending: false, error: null}
        default:
            return state;
    }
};

export const organizationPageReducer = (state = {
    pending: true,
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
        case organizationsActionConstants.CLEAR_ORGANIZATION_PAGE_STATE:
            return {...state, pending: false, organization: null, numberOfYearsSinceRegistration: null};
        case organizationsActionConstants.BANK_ACCOUNTS_FETCHED:
            return {...state, pending: false, bankAccounts: action.bankAccounts, error: null};
        default:
            return state;
    }
};

export const organizationAddingPageReducer = (state ={
    pending: false,
    error: null,
    addedOrganizationBin: null
}, action) => {
    switch (action.type) {
        case organizationsActionConstants.ADD_ORGANIZATION:
            return {...state, pending: true, error: null};
        case organizationsActionConstants.ORGANIZATION_ADDING_SUCCESS:
            return {...state, pending: false, addedOrganizationBin: action.addedOrganizationBin};
        case organizationsActionConstants.ORGANIZATION_ADDING_FAILURE:
            return {...state, pending: false, error: action.exception};
        default:
            return state;
    }
};

export const organizationUpdateReducer = (state = {
    pending: false,
    organization: null,
    error: null
}, action) => {
    switch (action.type) {
        case organizationsActionConstants.ORGANIZATION_UPDATE_INITIALIZED:
            return {...state, pending: false, error: null, organization: action.initialOrganization};
        case organizationsActionConstants.UPDATE_ORGANIZATION_FULL_NAME:
            return {...state, organization: {...state.organization, fullName: action.updatedFullName}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_SHORT_NAME:
            return {...state, organization: {...state.organization, shortName: action.updatedShortName}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_NUMBER_OF_EMPLOYEES:
            return {...state, organization: {...state.organization, numberOfEmployees: action.updatedNumberOfEmployees}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_FOUNDER:
            return {...state, organization: {...state.organization, founder: action.updatedFounder}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_PERMITTED_ECONOMIC_ACTIVITIES:
            return {...state, organization: {...state.organization, permittedEconomicActivities: action.updatedPermittedEconomicActivities}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_PRIMARY_ECONOMIC_ACTIVITY:
            return {...state, organization: {...state.organization, primaryEconomicActivity: action.updatedPrimaryEconomicActivity}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_TAXES_COMMITTEE:
            return {...state, organization: {...state.organization, taxesCommittee: action.updatedTaxesCommittee}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_ORGANIZATION_TYPE:
            return {...state, organization: {...state.organization, organizationType: action.updatedOrganizationType}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_PHONE_NUMBER:
            return {...state, organization: {...state.organization, phoneNumber: action.updatedPhoneNumber}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_ADDRESS:
            return {...state, organization: {...state.organization, address: action.updatedAddress}};
        case organizationsActionConstants.UPDATE_ORGANIZATION_REGISTRATION_DATE:
            return {...state, organization: {...state.organization, registrationDate: action.updatedRegistrationDate}};
        case organizationsActionConstants.UPDATE_ORGANIZATION:
            return {...state, pending: true, error: null};
        case organizationsActionConstants.ORGANIZATION_UPDATE_SUCCESS:
            return {...state, pending: false, error: null, updatedOrganization: action.updatedOrganization};
        case organizationsActionConstants.ORGANIZATION_UPDATE_FAILURE:
            return {...state, pending: false, error: action.exception};
        default:
            return state;
    }
};