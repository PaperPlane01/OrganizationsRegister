import {organizationTypesActionConstants} from "../constants/action-constants";

export const organizationsTypesReducer = (state = {
    pending: false,
    payload: {data: {}},
    error: null
}, action) => {
    switch (action.type) {
        case organizationTypesActionConstants.LOAD_ORGANIZATION_TYPES:
            return {...state, pending: true, payload:{data: {...state.payload.data}}, error: null};
        case organizationTypesActionConstants.ORGANIZATION_TYPES_LOADING_SUCCESS:
            return {...state, pending: false, payload: {
                data: {...state.payload.data, loadedOrganizationTypes: action.loadedOrganizationsTypes}
            }, error: null};
        case organizationTypesActionConstants.ORGANIZATION_TYPE_SELECT:
            return {...state, pending: false, payload: {
                data: {...state.payload.data, selectedOrganizationTypeOption: action.selectedOrganizationTypeOption}
            }, error: null};
        default:
            return state;
    }
};