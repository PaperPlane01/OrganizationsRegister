import {API_URL, BANK_ACCOUNTS, ORGANIZATIONS, SEARCH} from "../constants/api-constants";
import {organizationsActionConstants} from "../constants/action-constants";
import Validation from '../validation/Validation.js';
import axios from 'axios';

export const organizationsFetched = (organizations) => {
    return {
        type: organizationsActionConstants.ORGANIZATIONS_FETCHED,
        organizations: organizations
    }
};

export const organizationsSearchResultsReceived = (organizations) => {
    return {
        type: organizationsActionConstants.ORGANIZATIONS_SEARCH_SUCCESS,
        organizations: organizations
    }
};

export const organizationSelected = (option) => {
    return {
        type: organizationsActionConstants.ORGANIZATION_SELECTED,
        selectedOption: option
    }
};

export const organizationFullNameValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.FULL_NAME_VALIDATED,
        fullNameValidationResult: validationResult
    }
};

export const organizationShortNameValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.SHORT_NAME_VALIDATED,
        shortNameValidationResult: validationResult
    }
};

export const organizationAddressValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.ADDRESS_VALIDATED,
        addressValidationResult: validationResult
    }
};

export const organizationFounderValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.FOUNDER_VALIDATED,
        founderValidationResult: validationResult
    }
};

export const organizationNumberOfEmployeesValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.NUMBER_OF_EMPLOYEES_VALIDATED,
        numberOfEmployeesValidationResult: validationResult
    }
};

export const organizationMinNumberOfEmployeesValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.MIN_NUMBER_OF_EMPLOYEES_VALIDATED,
        minNumberOfEmployeesValidationResult: validationResult
    }
};

export const organizationMaxNumberOfEmployeesValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.MAX_NUMBER_OF_EMPLOYEES_VALIDATED,
        maxNumberOfEmployeesValidationResult: validationResult
    }
};

export const organizationPhoneNumberValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.PHONE_NUMBER_VALIDATED,
        phoneNumberValidationResult: validationResult
    }
};

export const organizationFoundByBin = (organization) => {
    return {
        type: organizationsActionConstants.ORGANIZATION_FOUND_BY_BIN,
        organization: organization
    }
};

export const organizationNotFoundByBin = (exception) => {
    return {
        type: organizationsActionConstants.ORGANIZATION_NOT_FOUND_BY_BIN,
        exception: exception
    }
};

export const numberOfYearsSinceRegistrationFetched = (numberOfYears) => {
    return {
        type: organizationsActionConstants.NUMBER_OF_YEARS_SINCE_REGISTRATION_FETCHED,
        numberOfYearsSinceRegistration: numberOfYears
    }
};

export const validateFullName = (fullName, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationFullNameValidated(Validation.validateOrganizationFullName(fullName, acceptEmpty)));
    }
};

export const validateShortName = (shortName, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationShortNameValidated(Validation.validateOrganizationShortName(shortName, acceptEmpty)));
    }
};

export const validateAddress = (address, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationAddressValidated(Validation.validateOrganizationAddress(address, acceptEmpty)));
    }
};

export const validateFounder = (founder, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationFounderValidated(Validation.validateOrganizationFounder(founder, acceptEmpty)));
    }
};

export const validateNumberOfEmployees = (numberOfEmployees, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationNumberOfEmployeesValidated(Validation.validateNumberOfEmployees(numberOfEmployees, acceptEmpty)));
    }
};

export const validatePhoneNumber = (phoneNumber, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationPhoneNumberValidated(Validation.validateOrganizationPhoneNumber(phoneNumber, acceptEmpty)))
    }
};

export const validateMinNumberOfEmployees = (minNumberOfEmployees, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationMinNumberOfEmployeesValidated(Validation
            .validateNumberOfEmployees(minNumberOfEmployees, acceptEmpty)));
    }
};

export const validateMaxNumberOfEmployees = (maxNumberOfEmployees, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationMaxNumberOfEmployeesValidated(Validation
            .validateNumberOfEmployees(maxNumberOfEmployees, acceptEmpty)))
    }
};

export const binValidated = (validationResult) => {
    return {
        type: organizationsActionConstants.BIN_VALIDATED,
        binValidationResult: validationResult
    }
};

export const validateBin = (bin, acceptEmpty) => {
    return (dispatch) => {
        dispatch(binValidated(Validation.validateOrganizationBin(bin, acceptEmpty)));
    }
};

export const searchOrganizationsByCriteria = (organizationsSearchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(ORGANIZATIONS).concat(SEARCH), JSON.stringify(organizationsSearchCriteria), {headers: {
            'Content-type': 'application/json'
        }}).then(response => {
            dispatch(organizationsSearchResultsReceived(response.data))
        })
    }
};

export const fetchOrganizationsByName = (nameContains) => {
    if (nameContains === '') {
        return (dispatch) => {
            dispatch(organizationsFetched([]));
        }
    }

    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATIONS), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(organizationsFetched(response.data));
        })
    }
};

export const handleOrganizationSelect = (option) => {
    return (dispatch) => {
        dispatch(organizationSelected(option));
    }
};

export const findOrganizationByBin = (bin) => {
    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATIONS).concat(bin))
            .then(response => {
                dispatch(organizationFoundByBin(response.data))
            })
            .catch(error => {
                dispatch(organizationNotFoundByBin(error.response.data.exception))
            })
    }
};

export const fetchNumberOfYearsSinceRegistration = (bin) => {
    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATIONS).concat(bin), {params: {
            action: 'getNumberOfYearsSinceOrganizationHasBeenRegistered'
        }}).then(response => {
            dispatch(numberOfYearsSinceRegistrationFetched(response.data));
        })
    }
};

export const clearOrganizationPageState = () => {
    return {
        type: organizationsActionConstants.CLEAR_ORGANIZATION_PAGE_STATE
    }
};

export const bankAccountsFetched = (bankAccounts) => {
    return {
        type: organizationsActionConstants.BANK_ACCOUNTS_FETCHED,
        bankAccounts: bankAccounts
    }
};

export const fetchBankAccounts = (organizationBIN) => {
    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATIONS)
            .concat("/").concat(organizationBIN)
            .concat(BANK_ACCOUNTS))
            .then(response => {
                dispatch(bankAccountsFetched(response.data))
            })
    }
};

export const organizationAdded = (organizationBIN) => {
    return {
        type: organizationsActionConstants.ORGANIZATION_ADDING_SUCCESS,
        addedOrganizationBin: organizationBIN
    }
};

export const organizationAddingFailure = (exception) => {
    return {
        type: organizationsActionConstants.ORGANIZATION_ADDING_FAILURE,
        exception: exception
    }
};

export const addOrganization = (organization) => {
    return (dispatch) => {
        axios.post(API_URL.concat(ORGANIZATIONS), JSON.stringify(organization), {headers: {
            token: localStorage.getItem('token'),
            'Content-type': 'application/json'
        }}).then(response => {
            dispatch(organizationAdded(response.data));
        }).catch(error => {
            dispatch(organizationAddingFailure(error.response.data.exception))
        })
    }
};