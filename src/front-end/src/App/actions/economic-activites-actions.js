import {economicActivitiesActionsConstants} from "../constants/action-constants";
import {API_URL, ECONOMIC_ACTIVITIES} from "../constants/api-constants";
import axios from 'axios';

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
    console.log('handling permitted economic activities select');
    console.log(selectedOptions);
    return (dispatch) => {
        dispatch(permittedEconomicActivitiesSelected(selectedOptions))
    }
};