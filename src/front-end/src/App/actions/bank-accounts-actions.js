import {bankAccountsActionsConstants} from "../constants/action-constants";
import axios from 'axios';
import {API_URL, BANK_ACCOUNTS, SEARCH} from "../constants/api-constants";
import {exceptions} from "../constants/exception-constants";
import Validation from '../validation/Validation';

export const bankAccountsFetched = (bankAccounts) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNTS_FETCHED,
        bankAccounts: bankAccounts
    }
};

export const fetchBankAccounts = (organization, bank) => {
    if (organization == undefined && bank != undefined) {
        return (dispatch) => {
            axios.get(API_URL.concat(BANK_ACCOUNTS), {params: {
                bankID: bank.id
            }}).then(response => {
                dispatch(bankAccountsFetched(response.data))
            })
        }
    }

    if (organization != undefined && bank == undefined) {
        return (dispatch) => {
            axios.get(API_URL.concat(BANK_ACCOUNTS), {params: {
                organizationBIN: organization.bin,
            }}).then(response => {
                dispatch(bankAccountsFetched(response.data))
            });
        }
    }

    if (organization != undefined && bank != undefined) {
        return (dispatch) => {
            axios.get(API_URL.concat(BANK_ACCOUNTS), {params: {
                organizationBIN: organization.bin,
                bankID: bank.id
            }}).then(response => {
                dispatch(bankAccountsFetched(response.data))
            });
        }
    }
};

export const bankAccountFetched = (bankAccount) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNT_FETCHED,
        bankAccount
    }
};

export const bankAccountFetchFailure = (error) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNT_FETCH_FAILURE,
        error
    }
};

export const fetchBankAccountById = (id) => {
    return (dispatch) => {
        axios.get(API_URL.concat(BANK_ACCOUNTS).concat('/').concat(id))
            .then(response => {
                dispatch(bankAccountFetched(response.data));
            })
            .catch(error => {
                const response = error.response;

                if (response.data.exception != undefined) {
                    dispatch(bankAccountFetchFailure({status: response.status, exception: response.data.exception}));
                } else {
                    dispatch(bankAccountFetchFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
                }
            })
    }
};

export const bankAccountsSearchSuccess = (bankAccounts) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNTS_SEARCH_SUCCESS,
        bankAccounts
    }
};

export const bankAccountsSearchFailure = (error) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNTS_SEARCH_FAILURE,
        error
    }
};

export const searchBankAccountsByCriteria = (searchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(BANK_ACCOUNTS).concat(SEARCH), JSON.stringify(searchCriteria), {headers: {
            'Content-type': 'application/json'
        }}).then(response => {
            dispatch(bankAccountsSearchSuccess(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(bankAccountsSearchFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(bankAccountFetchFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const bankAccountSavingSuccess = (savedBankAccount) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNT_SAVING_SUCCESS,
        savedBankAccount
    }
};

export const bankAccountSavingFailure = (error) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNT_SAVING_FAILURE,
        error
    }
};

export const saveBankAccount = (bankAccount) => {
    return (dispatch) => {
        axios.post(API_URL.concat(BANK_ACCOUNTS), JSON.stringify(bankAccount), {
            headers: {
                'Content-type': 'application/json',
                token: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch(bankAccountSavingSuccess(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(bankAccountSavingFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(bankAccountSavingFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const bankAccountUpdateSuccess = (updatedBankAccount) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNT_UPDATE_SUCCESS,
        updatedBankAccount
    }
};

export const bankAccountUpdateFailure = (error) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNT_UPDATE_FAILURE,
        error
    }
};

export const updateBankAccount = (bankAccount) => {
    return (dispatch) => {
        axios.put(API_URL.concat(BANK_ACCOUNTS), JSON.stringify(bankAccount), {headers: {
            'Content-type': 'application/json',
            token: localStorage.getItem('token')
        }}).then(response => {
            dispatch(bankAccountUpdateSuccess(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(bankAccountUpdateFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(bankAccountUpdateFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const bankAccountIdValidated = (idValidationResult) => {
    return {
        type: bankAccountsActionsConstants.BANK_ACCOUNT_ID_VALIDATED,
        idValidationResult
    }
};

export const validateBankAccountId = (id, acceptEmpty) => {
    return (dispatch) => {
        dispatch(bankAccountIdValidated(Validation.validateBankAccountId(id, acceptEmpty)));
    }
};