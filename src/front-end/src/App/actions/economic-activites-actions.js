import {economicActivitiesActionsConstants} from "../constants/action-constants";
import {API_URL, ECONOMIC_ACTIVITIES, SEARCH} from "../constants/api-constants";
import axios from 'axios';
import {exceptions} from "../constants/exception-constants";
import Validation from "../validation/Validation";

export const economicActivitiesFetched = (economicActivities) => {
    return {
        type: economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_FETCHED,
        economicActivities: economicActivities
    }
};

export const multipleEconomicActivitiesSelected = (economicActivitiesOptions) => {
    return {
        type: economicActivitiesActionsConstants.SELECT_MULTIPLE_ECONOMIC_ACTIVITIES,
        selectedEconomicActivitiesOptions: economicActivitiesOptions
    }
};

export const singleEconomicActivitySelected = (option) => {
    return {
        type: economicActivitiesActionsConstants.SELECT_SINGLE_ECONOMIC_ACTIVITY,
        selectedEconomicActivityOption: option
    }
};

export const fetchEconomicActivitiesByName = (nameContains) => {

    return (dispatch) => {
        if (nameContains === '') {
            dispatch(economicActivitiesFetched([]));
            return;
        }

        axios.get(API_URL.concat(ECONOMIC_ACTIVITIES), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(economicActivitiesFetched(response.data));
        })
    }
};

export const economicActivitiesSelected = (selectedOptions) => {
    return {
        type: economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_SELECTED,
        selectedOptions: selectedOptions
    }
};

export const handleEconomicActivitiesSelect = (selectedOptions) => {
    return (dispatch) => {
        dispatch(economicActivitiesSelected(selectedOptions));
    }
};

export const primaryEconomicActivitySelected = (selectedOption) => {
    return {
        type: economicActivitiesActionsConstants.PRIMARY_ECONOMIC_ACTIVITY_SELECTED,
        selectedOption: selectedOption
    }
};

export const handlePrimaryEconomicActivitySelect = (selectedOption) => {
    return (dispatch) => {
        dispatch(primaryEconomicActivitySelected(selectedOption));
    }
};

export const permittedEconomicActivitiesSelected = (selectedOptions) => {
    return {
        type: economicActivitiesActionsConstants.PERMITTED_ECONOMIC_ACTIVITIES_SELECTED,
        selectedOptions: selectedOptions
    }
};

export const handlePermittedEconomicActivitiesSelect = (selectedOptions) => {
    return (dispatch) => {
        dispatch(permittedEconomicActivitiesSelected(selectedOptions))
    }
};

export const primaryEconomicActivitySelectInitialized = (selectedPrimaryEconomicActivityOption) => {
    return {
        type: economicActivitiesActionsConstants.PRIMARY_ECONOMIC_ACTIVITY_SELECT_INITIALIZED,
        selectedOption: selectedPrimaryEconomicActivityOption
    }
};

export const initializePrimaryEconomicActivitySelect = (selectedOption) => {
    return (dispatch) => {
        dispatch(primaryEconomicActivitySelectInitialized(selectedOption))
    }
};

export const permittedEconomicActivitySelectInitialized = (selectedOptions) => {
    return {
        type: economicActivitiesActionsConstants.PERMITTED_ECONOMIC_ACTIVITY_SELECT_INITIALIZED,
        selectedOptions: selectedOptions
    }
};

export const initializePermittedEconomicActivitiesSelect = (selectedOptions) => {
    return (dispatch) => {
        dispatch(permittedEconomicActivitySelectInitialized(selectedOptions))
    }
};

export const economicActivtiesSearchResultsReceived = (searchResults) => {
    return {
        type: economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_SEARCH_SUCCESS,
        economicActivities: searchResults
    }
};

export const economicActivitiesSearchFailure = (error) => {
    return {
        type: economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_SEARCH_FAILURE,
        error: error
    }
};

export const searchEconomicActivitiesByCriteria = (searchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(ECONOMIC_ACTIVITIES).concat(SEARCH), JSON.stringify(searchCriteria), {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            dispatch(economicActivtiesSearchResultsReceived(response.data))
        }).catch(error => {
            const response = error.response;
            if (response.data.exception != undefined) {
                dispatch(economicActivitiesSearchFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(economicActivitiesSearchFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const economicActivityNameValidated = (validationResult) => {
    return {
        type: economicActivitiesActionsConstants.ECONOMIC_ACTIVITY_NAME_VALIDATED,
        nameValidationResult: validationResult
    }
};

export const validateEconomicActivityName = (name, acceptEmpty) => {
    return (dispatch) => {
        dispatch(economicActivityNameValidated(Validation.validateEconomicActivityName(name, acceptEmpty)))
    }
};