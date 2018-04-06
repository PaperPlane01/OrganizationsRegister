import {API_URL, ORGANIZATION_TYPES} from "../constants/api-constants";
import {organizationTypesActionConstants} from "../constants/action-constants";
import axios from 'axios';

export const organizationsTypesLoaded = (organizationsTypes) => {
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPES_LOADING_SUCCESS,
        loadedOrganizationsTypes: organizationsTypes
    }
};

export const organizationTypeSelected = (option) => {
    return {
        type: organizationTypesActionConstants.ORGANIZATION_TYPE_SELECT,
        selectedOrganizationTypeOption: option
    }
};

export const handleOrganizationTypeSelect = (option) => {
    return (dispatch) => {
        dispatch(organizationTypeSelected(option));
    }
};

export const loadOrganizationsTypes = () => {
    return (dispatch) => {
        axios.get(API_URL.concat(ORGANIZATION_TYPES)).then(response => {
            dispatch(organizationsTypesLoaded(response.data))
        })
    }
};