import {taxesCommitteesActionsConstants} from "../constants/action-constants";
import {API_URL, TAXES_COMMITTEES} from "../constants/api-constants";
import axios from 'axios';

export const taxesCommitteesLoaded = (taxesCommittees) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEES_LOADING_SUCCESS,
        taxesCommittees: taxesCommittees
    }
};

export const taxesCommitteeSelected = (option) => {
    return {
        type: taxesCommitteesActionsConstants.SELECT_TAXES_COMMITTEE,
        selectedTaxesCommitteeOption: option
    }
};

export const handleTaxesCommitteeSelect = (option) => {
    return (dispatch) => {
        dispatch(taxesCommitteeSelected(option));
    }
};

export const loadTaxesCommitteesWithNameContains = (nameContains) => {
    return (dispatch) => {
        if (nameContains === '') {
            dispatch(taxesCommitteesLoaded([]));
            return;
        }

        axios.get(API_URL.concat(TAXES_COMMITTEES), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(taxesCommitteesLoaded(response.data));
        })
    }
};