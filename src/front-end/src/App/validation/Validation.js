import ValidationResult from './ValidationResult';

const Constraints = {
    ORGANIZATION_BIN_LENGTH: 12,
    ORGANIZATION_BIN_REGEX: /^\d+$/,
    BANK_ACCOUNT_ID_REGEX: /^\d+$/,
    BANK_ACCOUNT_ID_LENGTH: 10,
    ORGANIZATION_FULL_NAME_MIN_LENGTH: 1,
    ORGANIZATION_FULL_NAME_MAX_LENGTH: 80,
    ORGANIZATION_SHORT_NAME_MIN_LENGTH: 1,
    ORGANIZATION_SHORT_NAME_MAX_LENGTH: 50,
    ORGANIZATION_ADDRESS_MIN_LENGTH: 1,
    ORGANIZATION_ADDRESS_MAX_LENGTH: 80,
    ORGANIZATION_PHONE_NUMBER_MIN_LENGTH: 1,
    ORGANIZATION_PHONE_NUMBER_MAX_LENGTH: 30,
    ORGANIZATION_FOUNDER_MIN_LENGTH: 1,
    ORGANIZATION_FOUNDER_MAX_LENGTH: 200,
    NUMBER_OF_EMPLOYEES_REGEX: /^\d+$/,
    BANK_NAME_MIN_LENGTH: 1,
    BANK_NAME_MAX_LENGTH: 80,
    BANK_ADDRESS_MIN_LENGTH: 1,
    BANK_ADDRESS_MAX_LENGTH: 80,
    ECONOMIC_ACTIVITY_NAME_MIN_LENGTH: 1,
    ECONOMIC_ACTIVITY_NAME_MAX_LENGTH: 80,
    ORGANIZATION_TYPE_NAME_MIN_LENGTH: 1,
    ORGANIZATION_TYPE_NAME_MAX_LENGTH: 30,
    TAXES_COMMITTEE_NAME_MIN_LENGTH: 1,
    TAXES_COMMITTEE_NAME_MAX_LENGTH: 80,
    TAXES_COMMITTEE_ADDRESS_MIN_LENGTH: 1,
    TAXES_COMMITTEE_ADDRESS_MAX_LENGTH: 80,
    FINANCIAL_STATISTICS_SUM_REGEX: /^-?\d*\.{0,1}\d+$/,
    FINANCIAL_ACCOUNT_NAME_MIN_LENGTH: 1,
    FINANCIAL_ACCOUNT_NAME_MAX_LENGTH: 80
};

class Validation {
    static validateOrganizationFullName(organizationFullName, acceptEmpty) {
        if ((organizationFullName == undefined || organizationFullName === '') && acceptEmpty !== true) {
            return new ValidationResult(false, 'Полное название организации не может быть пустым.');
        }

        if (organizationFullName.length > Constraints.ORGANIZATION_FULL_NAME_MAX_LENGTH) {
            return new ValidationResult(false, 'Полное название организации не может содержать более 80 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateOrganizationBin = (organizationBin, acceptEmpty) => {
        if (organizationBin == undefined || organizationBin === '') {
            if (acceptEmpty === true) {
                return new ValidationResult(true, '');
            } else {
                return new ValidationResult(false, 'БИН организации не мложет быть пустым.');
            }
        }

        if (!organizationBin.match(Constraints.ORGANIZATION_BIN_REGEX)) {
            return new ValidationResult(false, 'БИН должен состоять из цифр.');
        }

        if (organizationBin.length !== Constraints.ORGANIZATION_BIN_LENGTH) {
            return new ValidationResult(false, 'БИН организации должен состоять из 12 символов.');
        }

        return new ValidationResult(true, '');
    };

    static validateOrganizationShortName(organizationShortName, acceptEmpty) {
        if (organizationShortName == undefined || organizationShortName === '') {
            return new ValidationResult(true, '');
        }

        if (organizationShortName.length > Constraints.ORGANIZATION_SHORT_NAME_MAX_LENGTH) {
            return new ValidationResult(false, 'Сокращённое название организации не может содержать более 50 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateOrganizationAddress(organizationAddress, acceptEmpty) {
        if (organizationAddress == undefined ||organizationAddress === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Адрес организации не может быть пустым.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        if (organizationAddress.length > Constraints.ORGANIZATION_ADDRESS_MAX_LENGTH) {
            return new ValidationResult(false, 'Адрес организации не может содержать более 50 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateNumberOfEmployees(numberOfEmployees, acceptEmpty) {
        numberOfEmployees = ''.concat(numberOfEmployees);

        if (numberOfEmployees == undefined || numberOfEmployees === '') {
            if (acceptEmpty === true) {
                return new ValidationResult(true, '');
            } else {
                return new ValidationResult(false, 'Количество сотрудников не может быть пустым.');
            }
        }

        if (!numberOfEmployees.match(Constraints.NUMBER_OF_EMPLOYEES_REGEX)) {
            return new ValidationResult(false, 'Количество сотрудников должно быть выражено с помощью числа.');
        }

        return new ValidationResult(true, '');
    }

    static validateOrganizationPhoneNumber(phoneNumber, acceptEmpty) {
        if ((phoneNumber == undefined || phoneNumber === '') && acceptEmpty !== true) {
            return new ValidationResult(false, 'Номер терефона организации не может быть пустым.');
        }

        if (phoneNumber.length > Constraints.ORGANIZATION_PHONE_NUMBER_MAX_LENGTH) {
            return new ValidationResult(false, 'Номер телефона организации не может содержать более 30 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateOrganizationFounder(founder, acceptEmpty) {
        if ((founder == undefined || founder === '') && acceptEmpty !== true) {
            return new ValidationResult(false, 'Имя учредителя организации не может быть пустым.');
        }

        if (founder.length > Constraints.ORGANIZATION_FOUNDER_MAX_LENGTH) {
            return new ValidationResult(false, 'Имя учредителя организации не может содержать более 200 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateBankName(bankName, acceptEmpty) {
        if (bankName == undefined || bankName === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Имя банка не должно быть пустым.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        if (bankName.length > Constraints.BANK_NAME_MAX_LENGTH) {
            return new ValidationResult(false, 'Имя банка не может содежать более 80 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateBankAddress(bankAddress, acceptEmpty) {
        if (bankAddress == undefined || bankAddress === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Адрес банка не должен быть пустым.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        if (bankAddress.length > Constraints.BANK_ADDRESS_MAX_LENGTH) {
            return new ValidationResult(false, 'Адрес банка не может содержать более 80 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateEconomicActivityName(economicActivityName, acceptEmpty) {
        if (economicActivityName == undefined || economicActivityName === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Название хозяйственной деятельности не может быть пустым.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        if (economicActivityName.length > Constraints.ECONOMIC_ACTIVITY_NAME_MAX_LENGTH) {
            return new ValidationResult(false, 'Название экономической деятельности не может сожержать более 80 символов.')
        }

        return new ValidationResult(true, '');
    }

    static validateOrganizationTypeName(organizationTypeName, acceptEmpty) {
        if (organizationTypeName == undefined || organizationTypeName === '') {

            if (acceptEmpty === true) {
                return new ValidationResult(true, '');
            } else {
                return new ValidationResult(false, 'Название типа организации не может быть пустым.');
            }
        }

        if (organizationTypeName.length > Constraints.ORGANIZATION_TYPE_NAME_MAX_LENGTH) {
            return new ValidationResult(false, 'Название типа организации не может содержать более 30 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateTaxesCommitteeName(taxesCommitteeName, acceptEmpty) {
        if (taxesCommitteeName == undefined || taxesCommitteeName === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Название налогового комитета не может быть пустым.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        if (taxesCommitteeName.length > Constraints.TAXES_COMMITTEE_NAME_MAX_LENGTH) {
            return new ValidationResult(false, 'Название налогового комитета не должно содержать более 80 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateTaxesCommitteeAddress(taxesCommitteeAddress, acceptEmpty) {
        if (taxesCommitteeAddress == undefined || taxesCommitteeAddress === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Адрес налогового комитета не может быть пустым.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        if (taxesCommitteeAddress.length > Constraints.TAXES_COMMITTEE_ADDRESS_MAX_LENGTH) {
            return new ValidationResult(false, 'Адрес налогового комитета не должен содержать более 80 символов.');
        }

        return new ValidationResult(true, '');
    }

    static validateFinancialStatisticsSum = (sum, acceptEmpty) => {
        if (sum == undefined || sum === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Сумма не может быть пустой.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        sum = ''.concat(sum);

        if (!sum.match(Constraints.FINANCIAL_STATISTICS_SUM_REGEX)) {
            return new ValidationResult(false, 'Сумма должна быть выражена положительным или отрицательным числом. ' +
                ' В качестве разделителя следует использовать точку.')
        } else {
            return new ValidationResult(true, '');
        }
    };

    static validateFinancialAccountName = (name, acceptEmpty) => {
        if (name == undefined || name == '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Имя бухгалтерского счёта не может быть пустым.')
            } else {
                return new ValidationResult(true, '');
            }
        }

        if (name.length > Constraints.FINANCIAL_ACCOUNT_NAME_MAX_LENGTH) {
            return new ValidationResult(false, 'Имя бухгалтерского счёта не может содержать более 80 символов.');
        } else {
            return new ValidationResult(true, '');
        }
    };

    static validateBankAccountId = (id, acceptEmpty) => {
        if (id == undefined || id === '') {
            if (acceptEmpty === false) {
                return new ValidationResult(false, 'Код банковского счёта не может быть пустым.');
            } else {
                return new ValidationResult(true, '');
            }
        }

        id = ''.concat(id);

        if (!id.match(Constraints.BANK_ACCOUNT_ID_REGEX)) {
            return new ValidationResult(false, 'Код банковского счёта может состоять только из цифр.');
        }

        if (id.length !== Constraints.BANK_ACCOUNT_ID_LENGTH) {
            return new ValidationResult(false, 'Код банковского счёта должен состоять из 10 символов.');
        }

        return new ValidationResult(true, '');
    }
}

export default Validation;