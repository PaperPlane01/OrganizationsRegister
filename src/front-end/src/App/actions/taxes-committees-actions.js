import {taxesCommitteesActionsConstants} from "../constants/action-constants";
import {API_URL, SEARCH, TAXES_COMMITTEES} from "../constants/api-constants";
import axios from 'axios';
import Validation from "../validation/Validation";
import {exceptions} from "../constants/exception-constants";

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

export const taxesCommitteesSearchResultsReceived = (taxesCommittees) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEES_SEARCH_SUCCESS,
        taxesCommittees: taxesCommittees
    }
};

export const searchTaxesCommitteesByCriteria = (taxesCommitteesSearchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(TAXES_COMMITTEES).concat(SEARCH), JSON.stringify(taxesCommitteesSearchCriteria),
            {headers: {
                'Content-type': 'application/json'
            }}).then(response => dispatch(taxesCommitteesSearchResultsReceived(response.data)))
    }
};

export const taxesCommitteeNameValidated = (validationResult) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_NAME_VALIDATED,
        nameValidationResult: validationResult
    }
};

export const validateTaxesCommitteeName = (name, acceptEmpty) => {
    return (dispatch) => {
        dispatch(taxesCommitteeNameValidated(Validation.validateTaxesCommitteeName(name, acceptEmpty)))
    }
};

export const taxesCommitteeAddressValidated = (validationResult) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_ADDRESS_VALIDATED,
        addressValidationResult: validationResult
    }
};

export const validateTaxesCommitteeAddress = (address, acceptEmpty) => {
    return (dispatch) => {
        dispatch(taxesCommitteeAddressValidated(Validation.validateTaxesCommitteeAddress(address, acceptEmpty)))
    }
};

export const taxesCommitteeFetched = (taxesCommittee) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_FETCHED,
        taxesCommittee: taxesCommittee
    }
};

export const taxesCommitteeNotFound = (exception) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_NOT_FOUND,
        exception: exception
    }
};

export const fetchTaxesCommitteeById = (id) => {
    return (dispatch) => {
        axios.get(API_URL.concat(TAXES_COMMITTEES).concat(id))
            .then(response => {
                dispatch(taxesCommitteeFetched(response.data))
            })
            .catch(error => {
                switch (error.response.status) {
                    case 404:
                        dispatch(taxesCommitteeNotFound(exceptions.TAXES_COMMITTEE_NOT_FOUND));
                        break;
                    case 400:
                        dispatch(taxesCommitteeNotFound(exceptions.TAXES_COMMITTEE_NOT_FOUND));
                        break;
                    default:
                        dispatch(taxesCommitteeNotFound(exceptions.SERVER_ERROR));
                        break;
                }
            })
    }
};

export const taxesCommitteeSelectInitialized = (selectedTaxesCommitteeOption) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_SELECT_INITIALIZED,
        selectedOption: selectedTaxesCommitteeOption
    }
};

export const initializeTaxesCommitteeSelect = (selectedTaxesCommitteeOption) => {
    return (dispatch) => {
        dispatch(taxesCommitteeSelectInitialized(selectedTaxesCommitteeOption))
    }
};

export const taxesCommitteeAdded = (taxesCommitteeId) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_ADDING_SUCCESS,
        taxesCommitteeId: taxesCommitteeId
    }
};

export const taxesCommitteeAddingFailure = (exception) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_ADDING_FAILURE,
        exception: exception
    }
};

export const addTaxesCommittee = (taxesCommittee) => {
    return (dispatch) => {
        axios.post(API_URL.concat(TAXES_COMMITTEES), JSON.stringify(taxesCommittee), {headers: {
            'Content-type': 'application/json',
            token: localStorage.getItem('token')
        }}).then(response => {
            dispatch(taxesCommitteeAdded(response.data))
        }).catch(error => {
            if (error.response.data.exception !== undefined) {
                dispatch(taxesCommitteeAddingFailure(error.response.data.exception));
            } else {
                dispatch(taxesCommitteeAddingFailure(exceptions.SERVER_ERROR));
            }
        })
    }
};

export const taxesCommitteeUpdated = (updatedTaxesCommittee) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_UPDATE_SUCCESS,
        updatedTaxesCommittee: updatedTaxesCommittee
    }
};

export const taxesCommitteeUpdateFailure = (exception) => {
    return {
        type: taxesCommitteesActionsConstants.TAXES_COMMITTEE_UPDATE_FAILURE,
        exception: exception
    }
};

export const updateTaxesCommittee = (updatedTaxesCommittee) => {
    return (dipsatch) => {
        axios.put(API_URL.concat(TAXES_COMMITTEES), JSON.stringify(updatedTaxesCommittee), {headers: {
            'Content-type': 'application/json',
            token: localStorage.getItem('token')
        }}).then(response => {
            dipsatch(taxesCommitteeUpdated(response.data))
        }).catch(error => {
            if (error.response.data.exception === undefined) {
                dipsatch(taxesCommitteeAddingFailure(error.response.data.exception))
            } else {
                dipsatch(taxesCommitteeAddingFailure(exceptions.SERVER_ERROR))
            }
        })
    }
};