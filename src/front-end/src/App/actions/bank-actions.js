import axios from 'axios';
import {API_URL, BANKS, SEARCH} from "../constants/api-constants";
import {banksActionsConstants} from "../constants/action-constants";
import Validation from "../validation/Validation";
import {exceptions} from "../constants/exception-constants";

export const banksFetched = (banks) => {
    return {
        type: banksActionsConstants.BANKS_FETCHED,
        banks
    }
};

export const fetchBanksByName = (nameContains) => {
    if (nameContains === '') {
        return (dispatch) => {
            dispatch(banksFetched([]))
        }
    }

    return (dispatch) => {

        axios.get(API_URL.concat(BANKS), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(banksFetched(response.data))
        })
    }
};

export const bankSelected = (selectedBankOption) => {
    return {
        type: banksActionsConstants.BANK_SELECTED,
        selectedBankOption
    }
};

export const handleBankSelect = (selectedOption) => {
    return (dispatch) => {
        dispatch(bankSelected(selectedOption));
    }
};

export const banksSearchResultsReceived = (banks) => {
    return {
        type: banksActionsConstants.BANKS_SEARCH_SUCCESS,
        banks
    }
};

export const searchBanksByCriteria = (bankSearchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(BANKS).concat(SEARCH), JSON.stringify(bankSearchCriteria), {headers: {
            'Content-type': 'application/json'
        }}).then(response => {
            dispatch(banksSearchResultsReceived(response.data))
        })
    }
};

export const bankNameValidated = (validationResult) => {
    return {
        type: banksActionsConstants.BANK_NAME_VALIDATED,
        nameValidationResult: validationResult
    }
};

export const validateBankName = (name, acceptEmpty) => {
    return (dispatch) => {
        dispatch(bankNameValidated(Validation.validateBankName(name, acceptEmpty)))
    }
};

export const bankAddressValidated = (validationResult) => {
    return {
        type: banksActionsConstants.BANK_ADDRESS_VALIDATED,
        addressValidationResult: validationResult
    }
};

export const validateBankAddress = (address, acceptEmpty) => {
    return (dispatch) => {
        dispatch(bankAddressValidated(Validation.validateBankAddress(address, acceptEmpty)))
    }
};

export const bankFetched = (bank) => {
    return {
        type: banksActionsConstants.BANK_FETCHED,
        bank: bank
    }
};

export const bankFetchFailure = (exception) => {
    return {
        type: banksActionsConstants.BANK_NOT_FOUND,
        exception: exception
    }
};

export const fetchBankById = (id) => {
    return (dispatch) => {
        axios.get(API_URL.concat(BANKS).concat("/").concat(id))
            .then(response => {
                dispatch(bankFetched(response.data))})
            .catch(error => {
                switch (error.response.status) {
                    case 400:
                        dispatch(bankFetchFailure(exceptions.BANK_NOT_FOUND));
                        break;
                    case 404:
                        dispatch(bankFetchFailure(exceptions.BANK_NOT_FOUND));
                        break;
                    default:
                        dispatch(bankFetchFailure(exceptions.SERVER_ERROR));
                }
            })
    }
};

export const bankAddingSuccess = (addedBank) => {
    return {
        type: banksActionsConstants.BANK_ADDING_SUCCESS,
        addedBank
    }
};

export const bankAddingFailure = (error) => {
    return {
        type: banksActionsConstants.BANK_ADDING_FAILURE,
        error
    }
};

export const addBank = (bank) => {
    return (dispatch) => {
        axios.post(API_URL.concat(BANKS), JSON.stringify(bank), {headers: {
            'Content-type': 'application/json',
            token: localStorage.getItem('token')
        }}).then(response => {
            dispatch(bankAddingSuccess(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(bankAddingFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(bankAddingFailure({status: response.status, exception: exceptions.SERVER_ERROR}))
            }
        })
    }
};

export const bankUpdateSuccess = (updatedBank) => {
    return {
        type: banksActionsConstants.BANK_UPDATE_SUCCESS,
        updatedBank
    }
};

export const bankUpdateFailure = (error) => {
    return {
        type: banksActionsConstants.BANK_UPDATE_FAILURE,
        error
    }
};

export const updateBank = (bank) => {
    return (dispatch) => {
        return axios.put(API_URL.concat(BANKS), JSON.stringify(bank), {headers: {
            'Content-type': 'application/json',
            token: localStorage.getItem('token')
        }}).then(response => {
            dispatch(bankUpdateSuccess(response.data));
            return response.data;
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(bankUpdateFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(bankUpdateFailure({status:response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const clearBankAddingPageState = () => {
    return {
        type: banksActionsConstants.CLEAR_BANK_ADDING_PAGE_STATE
    }
};

export const clearBankUpdateDialogState = () => {
    return {
        type: banksActionsConstants.CLEAR_BANK_UPDATE_DIALOG_STATE
    }
};

export const clearBankSelectState = () => {
    return {
        type: banksActionsConstants.CLEAR_BANK_SELECT_STATE
    }
};