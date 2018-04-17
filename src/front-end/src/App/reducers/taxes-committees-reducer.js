import {taxesCommitteesActionsConstants} from "../constants/action-constants";

export const taxesCommitteesSelectReducer = (state = {
    pending: false,
    data: {
        dataSource: null,
        selectedOption: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case taxesCommitteesActionsConstants.FETCH_TAXES_COMMITTEES_BY_NAME:
            return {...state, pending: true};
        case taxesCommitteesActionsConstants.TAXES_COMMITTEES_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.taxesCommittees}};
        case taxesCommitteesActionsConstants.SELECT_TAXES_COMMITTEE:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        default:
            return state;
    }
};