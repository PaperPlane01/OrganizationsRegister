import {bankAccountsActionsConstants} from "../constants/action-constants";
import axios from 'axios';
import {API_URL, BANK_ACCOUNTS} from "../constants/api-constants";

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