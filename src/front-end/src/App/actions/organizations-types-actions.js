import {API_URL, ORGANIZATION_TYPES} from "../constants/api-constants";
import {organizationsActionConstants, organizationTypesActionConstants} from "../constants/action-constants";
import axios from 'axios';

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