import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Typography from "material-ui/es/Typography/Typography";
import Button from "material-ui/es/Button/Button";
import {FinancialAccountSelect} from "../selects";
import {fetchFinancialAccountsByName, handleFinancialAccountSelect} from "../../actions/financial-accounts-actions";
import compose from 'recompose/compose';
import withStyles from "material-ui/es/styles/withStyles";
import {formStyle} from "../../styles";

const styles = theme => formStyle(theme);

class OverallSumSearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearchRequest = () => {
        const {selectedFinancialAccountOption, onFormSubmitted} = this.props;

        if (selectedFinancialAccountOption == undefined) {
            onFormSubmitted(null);
        } else {
            onFormSubmitted(selectedFinancialAccountOption.value);
        }
    };

    render() {
        const {selectedFinancialAccountOption, fetchFinancialAccounts, fetchedFinancialAccounts,
            handleFinancialAccountSelect, classes} = this.props;

        return <div>
            <Typography variant="headline">Поиск суммарных финансовых показателей</Typography>
            <Typography variant="body1">Выберите бухгалтерский счёт:</Typography>
            <FinancialAccountSelect classes={classes}
                                    selectedOption={selectedFinancialAccountOption}
                                    onInput={(nameContains) => fetchFinancialAccounts(nameContains)}
                                    onSelect={(option) => handleFinancialAccountSelect(option)}
                                    financialAccounts={fetchedFinancialAccounts}
            />
            <Button variant={'raised'} color={'primary'} onClick={() => this.handleSearchRequest()}>
                Поиск
            </Button>
        </div>
    }
}

OverallSumSearchForm.propTypes = {
    selectedFinancialAccountOption: PropTypes.object,
    fetchFinancialAccounts: PropTypes.func,
    fetchedFinancialAccounts: PropTypes.array,
    handleFinancialAccountSelect: PropTypes.func,
    onFormSubmitted: PropTypes.func,
};

const mapStateToProps = (state) => {
    const {overallSumSearchPage} = state;
    const {financialAccountSelect} = overallSumSearchPage;

    return {
        fetchedFinancialAccounts: financialAccountSelect.dataSource,
        selectedFinancialAccountOption: financialAccountSelect.selectedOption
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFinancialAccounts: (nameContains) => dispatch(fetchFinancialAccountsByName(nameContains)),
        handleFinancialAccountSelect: (option) => dispatch(handleFinancialAccountSelect(option))
    }
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(OverallSumSearchForm);