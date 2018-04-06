import {userActionsConstants} from "../constants/action-constants";

export const userReducer = (state = {
    pending: false,
    loggedIn: localStorage.getItem("token") != undefined,
    currentUserData: {
        username: localStorage.getItem('username'),
        userID: localStorage.getItem('userID'),
        token: localStorage.getItem('token')
    },
    loginError: null,
    registrationError: {}
}, action) => {
    switch (action.type) {
        case userActionsConstants.LOGIN:
            return {...state, pending: true};
        case userActionsConstants.LOGIN_SUCCESS:
            return {...state, pending: false, loggedIn: true, currentUserData: {
                username: action.username,
                userID: action.userID,
                token: action.token
            }, loginError: null};
        case userActionsConstants.LOGOUT:
            return {...state, pending: true};
        case userActionsConstants.LOGOUT_DONE:
            return {...state, pending: false, loggedIn: false, currentUserData: {}, loginError: null};
        case userActionsConstants.LOGIN_FAILURE:
            return {...state, loginError: action.exception};
        default:
            return state;
    }
};