import {API_URL, ORGANIZATION_TYPES, ORGANIZATIONS, SEARCH} from "../constants/api-constants";
import {organizationsActionConstants, organizationTypesActionConstants} from "../constants/action-constants";
import axios from 'axios';
import {exceptions} from "../constants/exception-constants";
import Validation from "../validation/Validation";

export const organizationTypeSelected = (option) => {
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPE_SELECTED,
        selectedOption: option
    }
};

export const handleOrganizationTypeSelect = (option) => {
    return (dispatch) => {
        dispatch(organizationTypeSelected(option));
    }
};

export const organizationTypesFetched = (organizationTypes) => {
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPES_FETCHED,
        organizationTypes: organizationTypes
    }
};

export const fetchOrganizationTypes = () => {
    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATION_TYPES)).then(response => {
            dispatch(organizationTypesFetched(response.data));
        })
    }
};

export const organizationTypeSelectInitialized = (organizationTypeOption) => {
    console.log('organization type select initialized!');
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPE_SELECT_INITIALIZED,
        selectedOption: organizationTypeOption
    }
};

export const initializeOrganizationTypeSelect = (organizationTypeOption) => {
    console.log('initializing organization type');
    return (dispatch) => {
        dispatch(organizationTypeSelectInitialized(organizationTypeOption));
    }
};

export const organizationTypesSearchResultsReceived = (organizationTypes) => {
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPES_SEARCH_SUCCESS,
        organizationTypes: organizationTypes
    }
};

export const organizationTypesSearchFailure = (error) => {
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPES_SEARCH_FAILURE,
        error: error
    }
};

export const searchOrganizationTypesByCriteria = (searchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(ORGANIZATION_TYPES).concat(SEARCH), JSON.stringify(searchCriteria), {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            dispatch(organizationTypesSearchResultsReceived(response.data))
        }).catch(error => {
            const exception = error.response.data.exception;

            if (exception != undefined) {
                dispatch(organizationTypesSearchFailure(error))
            } else {
                dispatch(organizationTypesSearchFailure(exceptions.SERVER_ERROR))
            }
        })
    }
};

export const organizationTypeNameValidated = (nameValidationResult) => {
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPE_NAME_VALIDATED,
        nameValidationResult: nameValidationResult
    }
};

export const validateOrganizationTypeName = (name, acceptEmpty) => {
    return (dispatch) => {
        dispatch(organizationTypeNameValidated(Validation.validateOrganizationTypeName(name, acceptEmpty)))
    }
};