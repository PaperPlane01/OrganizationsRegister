import { combineReducers } from 'redux';
import {
    economicActivitiesSearchReducer, economicActivityValidationReducer, permittedEconomicActivitiesSelectReducer,
    primaryEconomicActivitySelectReducer
} from "./economic-activities-reducers";
import {
    taxesCommitteePageReducer,
    taxesCommitteesSearchRecuder, taxesCommitteesSelectReducer,
    taxesCommitteesValidationReducer, taxesCommitteeUpdateReducer
} from "./taxes-committees-reducer";
import {
    organizationTypeSelectReducer, organizationTypesSearchReducer,
    organizationTypeValidationReducer
} from "./organizations-types-reducers";
import {organizationSearchReducer, organizationValidationReducer} from "./organizations-reducers.js";
import {currentUserReducer} from "./user-reducer";
import {routerReducer} from 'react-router-redux';
import {
    organizationAddingPageReducer, organizationPageReducer, organizationSelectReducer, organizationUpdateReducer
} from "./organizations-reducers";
import {
    attributeSelectReducer, financialStatisticsAddingReducer,
    financialStatisticsSearchReducer, financialStatisticsValidationReducer, maxYearDialogReducer, minYearDialogReducer,
    overallFinancialStatisticsSumReducer,
    quarterSelectReducer,
    yearDialogReducer
} from "./financial-statistics-reducers";
import {
    bankAddingReducer, bankPageReducer, bankSelectReducer, banksSearchReducer, bankUpdateReducer,
    bankValidationReducer
} from "./banks-reducers";
import {
    bankAccountSavingReducer, bankAccountsSearchReducer,
    bankAccountValidationReducer
} from "./bank-accounts-reducers";
import {financialAccountSelectReducer} from "./financial-accounts-reducers";

export default combineReducers({
    organizationsSearch: combineReducers({
        searchedOrganizations: organizationSearchReducer,
        taxesCommitteeSelect: taxesCommitteesSelectReducer,
        economicActivitiesSelect: permittedEconomicActivitiesSelectReducer,
        organizationTypeSelect: organizationTypeSelectReducer,
        validation: organizationValidationReducer
    }),
    organizationAdding: combineReducers({
       organizationAddingInformation: organizationAddingPageReducer,
       taxesCommitteeSelect: taxesCommitteesSelectReducer,
       primaryEconomicActivitySelect: primaryEconomicActivitySelectReducer,
       permittedEconomicActivitiesSelect: permittedEconomicActivitiesSelectReducer,
       organizationTypeSelect: organizationTypeSelectReducer,
       validation: organizationValidationReducer
    }),
    organizationUpdate: combineReducers({
        organizationUpdateInformation: organizationUpdateReducer,
        primaryEconomicActivitySelect: primaryEconomicActivitySelectReducer,
        permittedEconomicActivitiesSelect: permittedEconomicActivitiesSelectReducer,
        organizationTypeSelect: organizationTypeSelectReducer,
        taxesCommitteeSelect: taxesCommitteesSelectReducer,
        validation: organizationValidationReducer
    }),
    financialStatisticsSearch: combineReducers({
       organizationSelect: organizationSelectReducer,
       financialStatistics: financialStatisticsSearchReducer,
       attributeSelect: attributeSelectReducer,
       minYearDialog: minYearDialogReducer,
       maxYearDialog: maxYearDialogReducer,
       quarterSelect: quarterSelectReducer,
       financialAccountSelect: financialAccountSelectReducer,
       validation: financialStatisticsValidationReducer
    }),
    financialStatisticsAdding: combineReducers({
        organizationSelect: organizationSelectReducer,
        attributeSelect: attributeSelectReducer,
        yearDialog: yearDialogReducer,
        quarterSelect: quarterSelectReducer,
        validation: financialStatisticsValidationReducer,
        financialAccountSelect: financialAccountSelectReducer,
        financialStatisticsAddingInfo: financialStatisticsAddingReducer
    }),
    organizationPage: combineReducers({
       organizationData: organizationPageReducer,
    }),
    bankAccountsSearchPage: combineReducers({
       organizationSelect: organizationSelectReducer,
       bankSelect: bankSelectReducer,
       validation: bankAccountValidationReducer,
       bankAccountsSearch: bankAccountsSearchReducer
    }),
    taxesCommitteesSearchPage: combineReducers({
       taxesCommitteesSearch: taxesCommitteesSearchRecuder,
       validation: taxesCommitteesValidationReducer
    }),
    taxesCommitteePage: taxesCommitteePageReducer,
    banksSearchPage: combineReducers({
        banksSearch: banksSearchReducer,
        validation: bankValidationReducer
    }),
    bankAddingPage: combineReducers({
        bankAddingInfo: bankAddingReducer,
        validation: bankValidationReducer
    }),
    bankUpdate: combineReducers({
        bankUpdateInfo: bankUpdateReducer,
        validation: bankValidationReducer
    }),
    taxesCommitteeUpdate: combineReducers({
        taxesCommitteeUpdateInfo: taxesCommitteeUpdateReducer,
        validation: taxesCommitteesValidationReducer
    }),
    economicActivitiesSearchPage: combineReducers({
        economicActivitiesSearch: economicActivitiesSearchReducer,
        validation: economicActivityValidationReducer
    }),
    organizationTypesSearchPage: combineReducers({
        organizationTypesSearch: organizationTypesSearchReducer,
        validation: organizationTypeValidationReducer
    }),
    bankAccountAddingPage: combineReducers({
        bankAccountAddingInfo: bankAccountSavingReducer,
        organizationSelect: organizationSelectReducer,
        bankSelect: bankSelectReducer,
        validation: bankAccountValidationReducer
    }),
    overallSumSearchPage: combineReducers({
       overallSumSearchInfo: overallFinancialStatisticsSumReducer,
       financialAccountSelect: financialAccountSelectReducer
    }),
    bankPage: bankPageReducer,
    routing: routerReducer,
    userData: currentUserReducer
});