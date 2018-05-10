import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FinancialAccountsTable} from "../components/tables";
import {FinancialAccountsSearchForm} from "../components/forms";
import Typography from "material-ui/Typography";
import Card, {CardContent} from "material-ui/Card";
import {searchFinancialAccountsByCriteria} from "../actions/financial-accounts-actions";
import {errorLabelStyle} from "../styles/index";

class FinancialAccountsSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {error, searchResults, handleSearchRequest} = this.props;

        return <div>
            <FinancialAccountsSearchForm onFormSubmitted={(searchCriteria) => handleSearchRequest(searchCriteria)}/>

            {searchResults == undefined || searchResults.length === 0
                ? <Typography variant="body1">Поиск не дал результатов.</Typography>
                : <Card>
                    <CardContent>
                        <FinancialAccountsTable dataSource={searchResults}/>
                    </CardContent>
                </Card>
            }

            {error != undefined
                ? <Typography variant="body1" style={errorLabelStyle}>
                    Во время поиска произошла ошибка. Сервер ответил со статусом {error.status}. Пожалуйста, попробуйте позже.
                </Typography>
                : ''
            }
        </div>
    }
};

FinancialAccountsSearchPage.propTypes = {
    error: PropTypes.object,
    searchResults: PropTypes.array,
    handleSearchRequest: PropTypes.func
};

const mapStateToProps = (state) => {
    const {financialAccountsSearch} = state.financialAccountsSearchPage;

    return {
        error: financialAccountsSearch.error,
        searchResults: financialAccountsSearch.searchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchFinancialAccountsByCriteria(searchCriteria))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialAccountsSearchPage);