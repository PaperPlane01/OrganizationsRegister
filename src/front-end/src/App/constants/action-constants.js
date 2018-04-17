export const userActionsConstants = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    LOGOUT_DONE: 'LOGOUT_DONE',
    FETCH_USER_BY_TOKEN: 'FETCH_USER_BY_TOKEN',
    USER_FETCHED_BY_TOKEN: 'USER_FETCHED_BY_TOKEN',
    USER_FETCHING_BY_TOKEN_FAILURE: 'USER_FETCHING_BY_TOKEN_FAILURE'
};

export const economicActivitiesActionsConstants = {
    ECONOMIC_ACTIVITIES_FETCHED: 'ECONOMIC_ACTIVITIES_FETCHED',
    FETCH_ECONOMIC_ACTIVITIES_BY_NAME: 'FETCH_ECONOMIC_ACTIVITIES_BY_NAME',
    SELECT_MULTIPLE_ECONOMIC_ACTIVITIES: 'SELECT_MULTIPLE_ECONOMIC_ACTIVITIES',
    SELECT_SINGLE_ECONOMIC_ACTIVITY: 'SELECT_SINGLE_ECONOMIC_ACTIVITY',
    SELECT_ECONOMIC_ACTIVITIES: 'SELECT_ECONOMIC_ACTIVITIES',
    ECONOMIC_ACTIVITIES_SELECTED: 'ECONOMIC_ACTIVITIES_SELECTED',
    PRIMARY_ECONOMIC_ACTIVITY_SELECTED: 'PRIMARY_ECONOMIC_ACTIVITY_SELECTED',
    PERMITTED_ECONOMIC_ACTIVITIES_SELECTED: 'PERMITTED_ECONOMIC_ACTIVITIES_SELECTED',
    ADD_ECONOMIC_ACTIVITY: 'ADD_ECONOMIC_ACTIVITY'
};

export const taxesCommitteesActionsConstants = {
    TAXES_COMMITTEES_FETCHED: 'TAXES_COMMITTEES_FETCHED',
    FETCH_TAXES_COMMITTEES_BY_NAME: 'FETCHED_TAXES_COMMITTEES_BY_NAME',
    SELECT_TAXES_COMMITTEE: 'SELECT_TAXES_COMMITTEE',
    ADD_TAXES_COMMITTEE: 'ADD_TAXES_COMMITTEE'
};

export const organizationTypesActionConstants = {
    ORGANIZATION_TYPES_FETCHED: 'ORGANIZATION_TYPES_FETCHED',
    FETCH_ORGANIZATION_TYPES_BY_NAME: 'FETCH_ORGANIZATION_TYPES_BY_NAME',
    ORGANIZATION_TYPE_SELECTED: 'ORGANIZATION_TYPE_SELECTED',
    ADD_ORGANIZATION_TYPE: 'ADD_ORGANIZATION_TYPE'
};

export const organizationsActionConstants = {
    FETCH_ORGANIZATIONS_BY_NAME: 'FETCH_ORGANIZATION_BY_NAME',
    ORGANIZATIONS_FETCHED: 'ORGANIZATIONS_FETCHED',
    SEARCH_ORGANIZATIONS_BY_CRITERIA: 'SEARCH_ORGANIZATIONS_BY_CRITERIA',
    ORGANIZATIONS_SEARCH_SUCCESS: 'ORGANIZATIONS_SEARCH_SUCCESS',
    ORGANIZATIONS_SEARCH_FAILURE: 'ORGANIZATIONS_SEARCH_FAILURE',
    ORGANIZATION_SELECTED: 'ORGANIZATION_SELECTED',
    ADD_ORGANIZATION: 'ADD_ORGANIZATION',
    ORGANIZATION_ADDING_SUCCESS: 'ORGANIZATION_ADDING_SUCCESS',
    ORGANIZATION_ADDING_FAILURE: 'ORGANIZATION-ADDING_FAILURE',
    VALIDATE_BIN: 'VALIDATE_BIN',
    BIN_VALIDATED: 'BIN_VALIDATED',
    VALIDATE_FULL_NAME: 'VALIDATE_FULL_NAME',
    VALIDATE_SHORT_NAME: 'VALIDATE_SHORT_NAME',
    VALIDATE_NUMBER_OF_EMPLOYEES: 'VALIDATE_NUMBER_OF_EMPLOYEES',
    VALIDATE_ADDRESS: 'VALIDATE_ADDRESS',
    VALIDATE_PHONE_NUMBER: 'VALIDATE_PHONE_NUMBER',
    VALIDATE_FOUNDER: 'VALIDATE_FOUNDER',
    FULL_NAME_VALIDATED: 'FULL_NAME_VALIDATED',
    SHORT_NAME_VALIDATED: 'SHORT_NAME_VALIDATED',
    NUMBER_OF_EMPLOYEES_VALIDATED: 'NUMBER_OF_EMPLOYEES_VALIDATED',
    MIN_NUMBER_OF_EMPLOYEES_VALIDATED: 'MIN_NUMBER_OF_EMPLOYEES_VALIDATED',
    MAX_NUMBER_OF_EMPLOYEES_VALIDATED: 'MAX_NUMBER_OF_EMPLOYEES_VALIDATED',
    ADDRESS_VALIDATED: 'ADDRESS_VALIDATED',
    PHONE_NUMBER_VALIDATED: 'PHONE_NUMBER_VALIDATED',
    FOUNDER_VALIDATED: 'FOUNDER_VALIDATED',
    FIND_BY_BIN: 'FIND_BY_BIN',
    ORGANIZATION_FOUND_BY_BIN: 'ORGANIZATION_FOUND_BY_BIN',
    ORGANIZATION_NOT_FOUND_BY_BIN: 'ORGANIZATION_NOT_FOUND_BY_BIN',
    FETCH_NUMBER_OF_YEARS_SINCE_REGISTRATION: 'FETCH_NUMBER_OF_YEARS_SINCE_REGISTRATION',
    NUMBER_OF_YEARS_SINCE_REGISTRATION_FETCHED: 'NUMBER_OF_YEARS_SINCE_REGISTRATION_FETCHED',
    CLEAR_ORGANIZATION_PAGE_STATE: 'CLEAR_ORGANIZATION_PAGE_STATE',
    FETCH_BANK_ACCOUNTS: 'FETCH_BANK_ACCOUNTS',
    BANK_ACCOUNTS_FETCHED: 'BANK_ACCOUNTS_FETCHED'
};

export const banksConstants = {
    ADD_BANK: 'ADD_BANK'
};

export const financialStatisticsConstants = {
    FETCH_FINANCIAL_STATISTICS: 'FETCH_FINANCIAL_STATISTICS',
    ADD_FINANCIAL_STATISTICS: 'ADD_FINANCIAL_STATISTICS',
    YEARS_FETCHED: 'YEARS_FETCHED',
    FETCH_YEARS: 'FETCH_YEARS',
    FINANCIAL_STATISTICS_FETCHED: 'FINANCIAL_STATISTICS_FETCHED',
    FINANCIAL_STATISTICS_FETCHING_FAILURE: 'FINANCIAL_STATISTICS_FETCHING_FAILURE',
    YEAR_SELECTED: 'YEAR_SELECTED',
    QUARTER_SELECTED: 'QUARTER_SELECTED',
    CLEAR_YEARS: 'CLEAR_YEAS',
    YEARS_CLEARED: 'YEARS_CLEARED',
    CLEAR_YEAR_SELECTION: 'CLEAR_YEAR_SELECTION',
    YEAR_SELECTION_CLEARED: 'YEAR_SELECTION_CLEARED',
    CLEAR_QUARTER_SELECTION: 'CLEAR_QUARTER_SELECTION',
    QUARTER_SELECTION_CLEARED: 'QUARTER_SELECTION_CLEARED',
    STATE_CLEARED: 'STATE_CLEARED'
};