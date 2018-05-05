import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BankAccountsTable} from '../components/tables';
import {BankAccountsSearchForm} from '../components/forms';
import {searchBankAccountsByCriteria} from "../actions/bank-accounts-actions";
import Typography from "material-ui/es/Typography/Typography";
import {errorLabelStyle} from "../styles";


class BankAccountsSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {searchResults, searchBankAccounts, error} = this.props;

        return <div>
            <BankAccountsSearchForm onFormSubmitted={(searchCriteria) => searchBankAccounts(searchCriteria)}/>

            {searchResults != undefined && searchResults.length !== null
                ? <BankAccountsTable dataSource={searchResults}/>
                : <Typography variant="body1">
                    Поиск не дал результатов.
                </Typography>}
            {error != undefined
                ? <Typography variant="body1" style={errorLabelStyle}>
                    Во время поиска произошла ошибка. Сервер ответил со статусом {error.status}. Пожалуйста, попробуйте позже.
                </Typography>
                : ''}
        </div>
    }
};

BankAccountsSearchPage.propTypes = {
    searchResults: PropTypes.array,
    error: PropTypes.object,
    searchBankAccounts: PropTypes.func
};

const mapStateToProps = (state) => {
    const {bankAccountsSearchPage} = state;
    const {searchResults, error} = bankAccountsSearchPage.bankAccountsSearch;

    return {
        searchResults: searchResults,
        error: error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchBankAccounts: (searchCriteria) => dispatch(searchBankAccountsByCriteria(searchCriteria))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountsSearchPage);