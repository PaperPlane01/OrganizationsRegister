import {taxesCommitteesActionsConstants} from "../constants/action-constants";
import {API_URL, TAXES_COMMITTEES} from "../constants/api-constants";
import axios from 'axios';

export const taxesCommitteesFetched = (taxesCommittees) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEES_FETCHED,
        taxesCommittees: taxesCommittees
    }
};

export const taxesCommitteeSelected = (option) => {
    return {
        type: taxesCommitteesActionsConstants.SELECT_TAXES_COMMITTEE,
        selectedOption: option
    }
};

export const handleTaxesCommitteeSelect = (option) => {
    return (dispatch) => {
        dispatch(taxesCommitteeSelected(option));
    }
};

export const fetchTaxesCommitteesByName = (nameContains) => {
    return (dispatch) => {
        if (nameContains === '') {
            dispatch(taxesCommitteesFetched([]));
            return;
        }

        axios.get(API_URL.concat(TAXES_COMMITTEES), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(taxesCommitteesFetched(response.data));
        })
    }
};