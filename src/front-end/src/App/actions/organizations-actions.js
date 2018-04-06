import {API_URL, ORGANIZATIONS, SEARCH} from "../constants/api-constants";
import {organizationsActionConstants} from "../constants/action-constants";
import Validation from '../validation/Validation.js';
import axios from 'axios';

export const organizationsLoaded = (organizations) => {
    return {
        type: organizationsActionConstants.ORGANIZATIONS_LOADING_SUCCESS,
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
        type: organizationsActionConstants.SELECT_ORGANIZATION,
        selectedOrganizationOption: option
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

export const organizationNotFoundByBin = () => {
    return {
        type: organizationsActionConstants.ORGANIZATION_NOT_FOUND_BY_BIN,
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

export const searchOrganizationsByCriteria = (organizationsSearchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(ORGANIZATIONS).concat(SEARCH), JSON.stringify(organizationsSearchCriteria), {headers: {
            'Content-type': 'application/json'
        }}).then(response => {
            dispatch(organizationsSearchResultsReceived(response.data))
        })
    }
};

export const loadOrganizationsWithNameContains = (nameContains) => {
    if (nameContains === '') {
        return (dispatch) => {
            dispatch(organizationsLoaded([]));
        }
    }

    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATIONS), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(organizationsLoaded(response.data));
        })
    }
};

export const loadOrganizationsByPage = (page) => {
    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATIONS), {params: {
            page: page
        }}).then(response => {
            dispatch(organizationsLoaded(response.data));
        })
    }
};

export const handleOrganizationSelect = (option) => {
    return (dispatch) => {
        dispatch(organizationSelected(option));
    }
};

export const getOrganizationByBin = (bin) => {
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