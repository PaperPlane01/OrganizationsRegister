import {taxesCommitteesActionsConstants} from "../constants/action-constants";

export const taxesCommitteesReducer = (state = {
    pending: false,
    payload:
        {data: {}},
    error: null
}, action) => {
    switch (action.type) {
        case taxesCommitteesActionsConstants.LOAD_TAXES_COMMITTEES_BY_NAME:
            return {...state, pending: true, payload: {data: {}}, error: null};
        case taxesCommitteesActionsConstants.TAXES_COMMITTEES_LOADING_SUCCESS:
            return {...state, pending: false, payload: {
                data: { ...state.payload.data,
                    loadedTaxesCommittees: action.taxesCommittees,
                }
            }, error: null};
        case taxesCommitteesActionsConstants.SELECT_TAXES_COMMITTEE:
            return {...state, pending: false, payload: {
                data: {...state.payload.data, selectedTaxesCommitteeOption: action.selectedTaxesCommitteeOption}
            }, error: null};
        default:
            return state;
    }
};