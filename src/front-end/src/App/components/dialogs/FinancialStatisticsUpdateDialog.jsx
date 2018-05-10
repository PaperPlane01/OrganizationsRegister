import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ValidationResult from "../../validation/ValidationResult";
import Button from "material-ui/Button";
import Dialog, {DialogTitle, DialogActions, DialogContent} from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import {errorLabelStyle, successLabelStyle, formStyle} from "../../styles/index";
import Input from "material-ui/Input";
import {withStyles} from 'material-ui';
import equals from "fast-deep-equal";
import {OrganizationSelect, FinancialAccountSelect, QuarterSelect, AttributeSelect} from "../selects";
import {YearSelectionDialog} from "./index";
import compose from 'recompose/compose';
import {
    clearAttributeSelect, clearFinancialStatisticsUpdateDialogState, clearFinancialStatisticsValidationState,
    clearQuarterSelection,
    clearYearSelection,
    fetchFinancialStatisticsById, handleAttributeSelect, handleQuarterSelect,
    handleYearSelect, updateFinancialStatistics, validateFinancialStatisticsSum
} from "../../actions/financial-statistics-actions";
import {
    clearOrganizationSelect, fetchOrganizationsByName,
    handleOrganizationSelect
} from "../../actions/organizations-actions";
import {
    clearFinancialAccountSelect, fetchFinancialAccountsByName,
    handleFinancialAccountSelect
} from "../../actions/financial-accounts-actions";

const styles = theme => formStyle(theme);

class FinancialStatisticsUpdateDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sum: '',
            isOpened: false,
            formValidationResult: new ValidationResult(true, '')
        }
    }

    handleSum = (sum) => {
        console.log('handling sum! ' + sum);
        this.setState({sum}, () => {
            this.props.validateSum(this.state.sum, false);
        })
    };

    handleOpenRequest = () => {
        this.setState({isOpened: true}, () => {
            const {fetchFinancialStatistics, financialStatisticsId} = this.props;
            if (this.props.initialFinancialStatistics == undefined) {
                fetchFinancialStatistics(financialStatisticsId).then(initialFinancialStatistics => {
                    const {handleOrganizationSelect, handleAttributeSelect, handleQuarterSelect,
                        handleYearSelect, handleFinancialAccountSelect} = this.props;

                    handleOrganizationSelect({label: initialFinancialStatistics.organization.fullName,
                        value: initialFinancialStatistics.organization});
                    handleQuarterSelect({label: initialFinancialStatistics.quarter,
                        value: initialFinancialStatistics.quarter});
                    handleFinancialAccountSelect({label: initialFinancialStatistics.financialAccount.name,
                        value: initialFinancialStatistics.financialAccount});
                    handleYearSelect(initialFinancialStatistics.year);
                    handleAttributeSelect(
                        {label: initialFinancialStatistics.attribute === 'debit'
                            ? 'Дебит'
                            : 'Кредит'
                        , value: initialFinancialStatistics.attribute}
                    );

                    this.handleSum(initialFinancialStatistics.sum);
                })
            }
        })
    };

    handleCloseRequest = () => {
        this.setState({isOpened: false}, () => {
            if (this.props.clearStateAfterClosing) {
                this.props.clearYearSelection();
                this.props.clearQuarterSelect();
                this.props.clearOrganizationSelect();
                this.props.clearFinancialAccountSelect();
                this.props.clearAttributeSelect();
                this.props.clearValidationState();
                this.props.clearDialogState();
            }
        })
    };

    handleUpdateRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                const {sum} = this.state;
                const {financialStatisticsId, selectedYear, selectedAttributeOption, selectedOrganizationOption,
                    selectedQuarterOption, selectedFinancialAccountOption, updateFinancialStatistics} = this.props;

                const year = selectedYear;
                const id = financialStatisticsId;
                const attribute = selectedAttributeOption.value;
                const quarter = selectedQuarterOption.value;
                const organization = selectedOrganizationOption.value;
                const financialAccount = selectedFinancialAccountOption.value;

                updateFinancialStatistics({id, organization, financialAccount, year, quarter,
                    attribute, sum}).then(updatedFinancialStatistics => {
                        if (this.props.onUpdate != undefined) {
                            this.props.onUpdate(updatedFinancialStatistics);
                        }
                    })
            };
        })
    };

    async assertAllFieldsAreValid() {
        const {sum} = this.state;

        const {selectedOrganizationOption, selectedQuarterOption, selectedAttributeOption,
            selectedFinancialAccountOption, validateSum, sumValidationResult} = this.props;

        validateSum(sum, false);

        if (!sumValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
            return;
        }

        if (selectedOrganizationOption == undefined || selectedQuarterOption == undefined
            || selectedAttributeOption == undefined || selectedFinancialAccountOption == undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые обязательные поля не заполнены.')});
            return;
        }

        this.setState({formValidationResult: new ValidationResult(true, '')});
    }

    render() {
        const {selectedOrganizationOption, handleOrganizationSelect, organizations, fetchOrganizations,
            financialAccounts, fetchFinancialAccounts, selectedFinancialAccountOption, handleFinancialAccountSelect,
            selectedYear, handleYearSelect, selectedQuarterOption, quarters, handleQuarterSelect, selectedAttributeOption,
            handleAttributeSelect, attributeOptions, sumValidationResult, initialFinancialStatistics, classes,
            updateSuccess, error} = this.props;

        const {formValidationResult} = this.state;

        let dialogBody = (<Typography variant="body1">Загрузка...</Typography>);

        if (initialFinancialStatistics != undefined) {
            dialogBody = (<div>
                <Typography variant="body1">Предприятие (обязательно):</Typography>
                <OrganizationSelect organizations={organizations}
                                    selectedOption={selectedOrganizationOption}
                                    onSelect={(option) => handleOrganizationSelect(option)}
                                    onInput={(nameContains) => fetchOrganizations(nameContains)}
                />

                <Typography variant="body1">Бухгалтеркский счёт (обязательно):</Typography>
                <FinancialAccountSelect financialAccounts={financialAccounts}
                                        selectedOption={selectedFinancialAccountOption}
                                        onInput={(nameContains) => fetchFinancialAccounts(nameContains)}
                                        onSelect={(option) => handleFinancialAccountSelect(option)}
                />

                <Typography variant="body1">Год (обязательно):</Typography>
                <YearSelectionDialog minYear={1955}
                                     maxYear={new Date().getFullYear() + 1}
                                     selectedYear={selectedYear}
                                     onSelect={(year) => handleYearSelect(year)}
                                     disableFuture={true}
                                     disablePast={false}
                                     classes={classes}
                />

                <Typography variant="body1">Квартал (обязательно):</Typography>
                <QuarterSelect onSelect={(option) => handleQuarterSelect(option)}
                               selectedOption={selectedQuarterOption}
                               quarters={quarters}
                />

                <Typography variant="body1">Признак (обязательно):</Typography>
                <AttributeSelect selectedOption={selectedAttributeOption}
                                 onSelect={(option) => handleAttributeSelect(option)}
                                 attributes={attributeOptions}
                />

                <Typography variant="body1">Сумма (обязательно):</Typography>
                {!sumValidationResult.isSuccessful()
                    ? <Typography variant="body1" style={errorLabelStyle}>{sumValidationResult.getMessage()}</Typography>
                    : ''}
                <Input fullWidth={true}
                       placeholder={'Введите сумму'}
                       onChange={(event) => this.handleSum(event.target.value)}
                       value={this.state.sum}
                />
            </div>);

        }

        return <div>
            <Button onClick={() => this.handleOpenRequest()}
                    variant={'raised'} color={'primary'}>
                Редактировать
            </Button>

            <Dialog open={this.state.isOpened}>
                <DialogTitle>Редактировать финансовые показатели</DialogTitle>

                <DialogContent>
                    {dialogBody}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => this.handleCloseRequest()}
                            variant={'raised'}
                            color={'primary'}>
                        Закрыть
                    </Button>
                    {initialFinancialStatistics != undefined
                        ? <Button onClick={() => this.handleUpdateRequest()}
                                  variant={'raised'}
                                  color={'primary'}>
                            Обновить
                        </Button>
                        : ''}
                    {updateSuccess ? <Typography variant="body1" style={successLabelStyle}>
                        Финансовые показатели успещно обновлены!
                    </Typography> : ''}
                    {error != undefined
                        ? <Typography variant="body1" style={errorLabelStyle}>
                            Во время попытки обновить финансовые показатели произошла ошибка. Сервер ответил
                             со статусом {error.status}. Пожалуйста, попробуйте позже.
                        </Typography>
                        : ''}
                    {!formValidationResult.isSuccessful()
                        ? <Typography variant="body1" style={errorLabelStyle}>
                            {formValidationResult.getMessage()}
                        </Typography>
                        : ''}
                </DialogActions>
            </Dialog>
        </div>
    }
}

FinancialStatisticsUpdateDialog.propTypes = {
    financialStatisticsId: PropTypes.number,
    initialFinancialStatistics: PropTypes.object,
    updatedFinancialStatistics: PropTypes.object,
    error: PropTypes.object,
    fetchFinancialStatistics: PropTypes.func,
    selectedOrganizationOption: PropTypes.object,
    fetchOrganizations: PropTypes.func,
    fetchedOrganizations: PropTypes.array,
    handleOrganizationSelect: PropTypes.func,
    selectedYear: PropTypes.number,
    handleYearSelect: PropTypes.func,
    selectedQuarterOption: PropTypes.object,
    handleQuarterSelect: PropTypes.func,
    selectedAttributeOption: PropTypes.object,
    handleAttributeSelect: PropTypes.func,
    selectedFinancialAccountOption: PropTypes.object,
    handleFinancialAccountSelect: PropTypes.func,
    fetchFinancialAccounts: PropTypes.func,
    fetchedFinancialAccounts: PropTypes.array,
    sumValidationResult: PropTypes.object,
    validateSum: PropTypes.func,
    updateSuccess: PropTypes.bool,
    quarters: PropTypes.array,
    attributes: PropTypes.array,
    onUpdate: PropTypes.func,
    clearStateAfterClosing: PropTypes.bool,
    clearAttributeSelect: PropTypes.func,
    clearOrganizationSelect: PropTypes.func,
    clearYearSelection: PropTypes.func,
    clearQuarterSelect: PropTypes.func,
    clearFinancialAccountSelect: PropTypes.func,
    clearValidationState: PropTypes.func,
    clearDialogState: PropTypes.func
};

const mapStateToProps = (state) => {
    const {financialStatisticsUpdate} = state;
    const {organizationSelect, attributeSelect, quarterSelect, yearDialog, validation,
        financialAccountSelect, financialStatisticsUpdateInfo} = financialStatisticsUpdate;

    return {
        initialFinancialStatistics: financialStatisticsUpdateInfo.initialFinancialStatistics,
        updatedFinancialStatistics: financialStatisticsUpdateInfo.updatedFinancialStatistics,
        error: financialStatisticsUpdateInfo.error,
        updateSuccess: financialStatisticsUpdateInfo.updateSuccess,
        fetchedOrganizations: organizationSelect.data.dataSource,
        selectedOrganizationOption: organizationSelect.data.selectedOption,
        selectedAttributeOption: attributeSelect.selectedOption,
        attributes: attributeSelect.attributeOptions,
        quarters: quarterSelect.data.dataSource,
        selectedQuarterOption: quarterSelect.data.selectedOption,
        selectedFinancialAccountOption: financialAccountSelect.selectedOption,
        fetchedFinancialAccounts: financialAccountSelect.dataSource,
        selectedYear: yearDialog.selectedYear,
        sumValidationResult: validation.sumValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFinancialStatistics: (id) => dispatch(fetchFinancialStatisticsById(id)),
        fetchOrganizations: (nameContains) => dispatch(fetchOrganizationsByName(nameContains)),
        handleOrganizationSelect: (selectedOption) => dispatch(handleOrganizationSelect(selectedOption)),
        fetchFinancialAccounts: (nameContains) => dispatch(fetchFinancialAccountsByName(nameContains)),
        handleFinancialAccountSelect: (selectedOption) => dispatch(handleFinancialAccountSelect(selectedOption)),
        handleYearSelect: (year) => dispatch(handleYearSelect(year)),
        handleQuarterSelect: (selectedOption) => dispatch(handleQuarterSelect(selectedOption)),
        handleAttributeSelect: (selectedOption) => dispatch(handleAttributeSelect(selectedOption)),
        validateSum: (sum, acceptEmpty) => dispatch(validateFinancialStatisticsSum(sum, acceptEmpty)),
        clearYearSelection: () => dispatch(clearYearSelection()),
        clearOrganizationSelect: () => dispatch(clearOrganizationSelect()),
        clearAttributeSelect: () => dispatch(clearAttributeSelect()),
        clearValidationState: () => dispatch(clearFinancialStatisticsValidationState()),
        clearDialogState: () => dispatch(clearFinancialStatisticsUpdateDialogState()),
        updateFinancialStatistics: (financialStatistics) => dispatch(updateFinancialStatistics(financialStatistics)),
        clearQuarterSelect: () => dispatch(clearQuarterSelection()),
        clearFinancialAccountSelect: () => dispatch(clearFinancialAccountSelect())
    }
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FinancialStatisticsUpdateDialog);