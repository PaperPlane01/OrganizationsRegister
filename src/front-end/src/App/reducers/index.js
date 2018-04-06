import { combineReducers } from 'redux';
import {economicActivitiesReducer} from "./economic-activities-reducer";
import {taxesCommitteesReducer} from "./taxes-committees-reducer";
import {organizationsTypesReducer} from "./organizations-types-reducer";
import {organizationSearchReducer, organizationValidationReducer} from "./organizations-reducers.js";
import {userReducer} from "./user-reducer";
import {routerReducer} from 'react-router-redux';
import {organizationsReducer} from "./organizations-reducers";
import {financialStatisticsReducer} from "./financial-statistics-reducers";
export default combineReducers({
    organizationsSearch: combineReducers({
        searchedOrganizations: organizationSearchReducer,
        organizations: organizationsReducer,
        taxesCommittees: taxesCommitteesReducer,
        economicActivities: economicActivitiesReducer,
        organizationsTypes: organizationsTypesReducer,
        validation: organizationValidationReducer
    }),
    financialStatisticsSearch: combineReducers({
       organizations: organizationsReducer,
       financialStatistics: financialStatisticsReducer
    }),
    routing: routerReducer,
    userData: userReducer
});