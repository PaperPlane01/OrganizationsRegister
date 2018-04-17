import {API_URL, ORGANIZATION_TYPES} from "../constants/api-constants";
import {organizationTypesActionConstants} from "../constants/action-constants";
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