import {userActionsConstants} from "../constants/action-constants";

export const currentUserReducer = (state = {
    pending: false,
    loggedIn: localStorage.getItem("token") != undefined,
    currentUserData: {
        username: localStorage.getItem('username'),
        userID: localStorage.getItem('userID'),
        token: localStorage.getItem('token')
    },
    currentUser: null,
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
        case userActionsConstants.FETCH_USER_BY_TOKEN:
            return {...state, pending: true};
        case userActionsConstants.USER_FETCHED_BY_TOKEN:
            console.log('user fetched!');
            return {...state, currentUser: action.user};
        default:
            return state;
    }
};