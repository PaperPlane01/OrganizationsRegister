import axios from 'axios';
import {financialAccountsActionsConstants} from '../constants/action-constants';
import {API_URL, FINANCIAL_ACCOUNTS, SEARCH} from "../constants/api-constants";
import {exceptions} from "../constants/exception-constants";
import Validation from "../validation/Validation";

export const financialAccountsFetched = (financialAccounts) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNTS_FETCH_SUCCESS,
        financialAccounts
    }
};

export const fetchFinancialAccountsByName = (nameContains) => {
    
    return (dispatch) => {
        if (nameContains == undefined || nameContains === '') {
            dispatch(financialAccountsFetched([]));
            return;
        }

        axios.get(API_URL.concat(FINANCIAL_ACCOUNTS), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(financialAccountsFetched(response.data))
        })
    }
};

export const financialAccountSelected = (selectedOption) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_SELECTED,
        selectedOption
    }
};

export const handleFinancialAccountSelect = (selectedOption) => {
    return (dispatch) => {
        dispatch(financialAccountSelected(selectedOption));
    }
}

export const financialAccountFetchSuccess = (financialAccount) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_FETCH_SUCCESS,
        financialAccount
    }
};

export const financialAccountFetchFailure = (error) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_FETCH_FAILURE,
        error
    }
};

export const fetchFinancialAccountById = (id) => {
    return (dispatch) => {
        axios.get(API_URL.concat(FINANCIAL_ACCOUNTS).concat("/").concat(id))
            .then(response => {
                dispatch(financialAccountFetchSuccess(response.data))
            })
            .catch(error => {
                const response = error.response;
                if (response.data.exception != undefined) {
                    dispatch(financialAccountFetchFailure({status: response.status, exception: response.data.exception}));
                } else {
                    dispatch(financialAccountFetchFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
                }
            })
    }
};

export const financialAccountsSearchSuccess = (financialAccounts) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNTS_SEARCH_SUCCESS,
        financialAccounts
    }
};

export const financialAccountsSearchFailure = (error) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNTS_SEARCH_FAILURE,
        error
    }
};

export const searchFinancialAccountsByCriteria = (searchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(FINANCIAL_ACCOUNTS).concat(SEARCH), JSON.stringify(searchCriteria), {
                headers: {
                    'Content-type': 'application/json'
                }
        }).then(response => {
                dispatch(financialAccountsSearchSuccess(response.data))
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(financialAccountsSearchFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(financialAccountsSearchFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const financialAccountAdded = (financialAccount) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_ADDING_SUCCESS,
        addedFinancialAccount: financialAccount
    }
};

export const financialAccountAddingFailure = (error) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_ADDING_FAILURE,
        error
    }
};

export const addFinancialAccount = (financialAccount) => {
    return (dispatch) => {
        axios.post(API_URL.concat(FINANCIAL_ACCOUNTS), JSON.stringify(financialAccount), {headers: {
            'Content-type': 'application/json',
            token: localStorage.getItem('token')
        }}).then(response => {
            dispatch(financialAccountAdded(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(financialAccountAddingFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(financialAccountAddingFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const financialAccountUpdated = (updatedFinancialAccount) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_UPDATE_SUCCESS,
        updatedFinancialAccount
    }
};

export const financialAccountUpdateFailure = (error) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_UPDATE_FAILURE,
        error
    }
};

export const updateFinancialAccount = (financialAccount) => {
    return (dispatch) => {
        axios.put(API_URL.concat(FINANCIAL_ACCOUNTS), JSON.stringify(financialAccount), {headers: {
            'Content-type': 'application/json',
            token: localStorage.getItem('token')
        }}).then(response => {
            dispatch(financialAccountUpdated(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(financialAccountUpdateFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(financialAccountUpdateFailure({status: response.status, exception: exceptions.SERVER_ERROR}))
            }
        })
    }
};

export const financialAccountNameValidated = (validationResult) => {
    return {
        type: financialAccountsActionsConstants.FINANCIAL_ACCOUNT_NAME_VALIDATED,
        nameValidationResult: validationResult
    }
};

export const validateFinancialAccountName = (name, acceptEmpty) => {
    return (dispatch) => {
        dispatch(financialAccountNameValidated(Validation.validateFinancialAccountName(name, acceptEmpty)));
    }
};

export const clearFinancialAccountSelect = () => {
    return {
        type: financialAccountsActionsConstants.CLEAR_FINANCIAL_ACCOUNT_SELECT
    }
};