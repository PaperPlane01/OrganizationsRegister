import {API_URL, TOKENS, USER} from "../constants/api-constants";
import {userActionsConstants} from "../constants/action-constants";
import axios from 'axios';

export const loginSuccess = (userID, username, token) => (
    {
        type: userActionsConstants.LOGIN_SUCCESS,
        userID,
        username,
        token
    }
);

export const loginFailure = (exception) => (
    {
        type: userActionsConstants.LOGIN_FAILURE,
        exception
    }
);

export const logoutDone = () => (
    {
        type: userActionsConstants.LOGOUT_DONE,
    }
);

export const userFetchedByToken = (user) => {
    return {
        type: userActionsConstants.USER_FETCHED_BY_TOKEN,
        user: user
    }
};

export const userFetchingByTokenFailure = (exception) => {
    return {
        type: userActionsConstants.USER_FETCHING_BY_TOKEN_FAILURE,
        exception: exception
    }
};

export const doLogout = () => {
    return (dispatch) => {
        axios.delete(API_URL.concat(TOKENS), {headers: {
            token: localStorage.getItem("token")
        }}).then(() => {
            localStorage.removeItem("userID");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            dispatch(logoutDone());
        })
    }
};

export const doLogin = (username, password) => {
    return dispatch => {
        axios.get(API_URL.concat(TOKENS), {params: {
            username: username,
            password: password
        }}).then(response => {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("userID", response.data.userID);
            localStorage.setItem("token", response.data.token);
            dispatch(loginSuccess(response.data.userID, response.data.username, response.data.token));
        }).catch(error => {
            dispatch(loginFailure(error.response.data.exception));
        })
    }
};

export const fetchCurrentUser = () => {
    return (dispatch) => {
        axios.get(API_URL.concat(TOKENS).concat(USER), {headers: {
            token: localStorage.getItem('token')
        }}).then(response => {
            dispatch(userFetchedByToken(response.data))
        }).catch(error => {
            dispatch(userFetchingByTokenFailure(error.response.data.exception))
        })
    }
};