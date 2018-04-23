import {organizationTypesActionConstants} from "../constants/action-constants";

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