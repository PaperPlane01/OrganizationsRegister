import {economicActivitiesActionsConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const primaryEconomicActivitySelectReducer = (state = {
    pending: false,
    data: {
        selectedOption: null,
        dataSource: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case economicActivitiesActionsConstants.FETCH_ECONOMIC_ACTIVITIES_BY_NAME:
            return {...state, pending: true};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.economicActivities}};
        case economicActivitiesActionsConstants.PRIMARY_ECONOMIC_ACTIVITY_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        case economicActivitiesActionsConstants.PRIMARY_ECONOMIC_ACTIVITY_SELECT_INITIALIZED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        default: return state;
    }
};

export const permittedEconomicActivitiesSelectReducer = (state = {
    pending: false,
    data: {
        selectedOptions: null,
        dataSource: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case economicActivitiesActionsConstants.FETCH_ECONOMIC_ACTIVITIES_BY_NAME:
            return {...state, pending: true};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.economicActivities}};
        case economicActivitiesActionsConstants.PERMITTED_ECONOMIC_ACTIVITIES_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOptions: action.selectedOptions}};
        case economicActivitiesActionsConstants.PERMITTED_ECONOMIC_ACTIVITY_SELECT_INITIALIZED:
            return {...state, pending: false, data: {...state.data, selectedOptions: action.selectedOptions}};
        default:
            return state;
    }
};

export const economicActivitiesSearchReducer = (state = {
    searchResults: null,
    error: null,
    pending: false
}, action) => {
    switch (action.type) {
        case economicActivitiesActionsConstants.SEARCH_ECONOMIC_ACTIVITIES:
            return {...state, searchResults: null, pending: true, error: null};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_SEARCH_SUCCESS:
            return {...state, searchResults: action.economicActivities, error: null, pending: false};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_SEARCH_FAILURE:
            return {...state, searchResults: null, pending: false, error: action.error};
        default:
            return state;
    }
};

export const economicActivityValidationReducer = (state = {
    validationResults: {
        nameValidationResult: new ValidationResult(true, '')
    },
}, action) => {
    switch (action.type) {
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITY_NAME_VALIDATED:
            return {...state, validationResults: {...state.validationResults,
                nameValidationResult: action.nameValidationResult}};
        case economicActivitiesActionsConstants.CLEAR_ECONOMIC_ACTIVITY_VALIDATION_STATE:
            return {...state, nameValidationResult: new ValidationResult(true, '')};
        default:
            return state;
    }
};

export const economicActivityUpdateReducer = (state = {
    initialEconomicActivity: null,
    updatedEconomicActivity: null,
    pending: false,
    error: null
}, action) => {
    switch (action.type) {
        case economicActivitiesActionsConstants.UPDATE_ECONOMIC_ACTIVITY:
            return {...state, pending: true, updatedEconomicActivity: null, error: null};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITY_UPDATE_SUCCESS:
            return {...state, pending: false, updateSuccess: true, updatedEconomicActivity: action.updatedEconomicActivity};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITY_UPDATE_FAILURE:
            return {...state, pending: false, updateSuccess: false, error: action.error, updatedEconomicActivity: null};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITY_FETCH_SUCCESS:
            return {...state, pending: false, initialEconomicActivity: action.economicActivity};
        case economicActivitiesActionsConstants.CLEAR_ECONOMIC_ACTIVITY_UPDATE_DIALOG_STATE:
            return {...state, pending: false, updatedEconomicActivity: null, updateSuccess: false,
                initialEconomicActivity: null, error: null};
        default:
            return state;
    }
};