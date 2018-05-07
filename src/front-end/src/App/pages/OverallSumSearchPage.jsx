import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {OverallSumTable} from "../components/tables";
import {OverallSumSearchForm} from "../components/forms";
import {fetchOverallSumOfFinancialAccounts} from "../actions/financial-statistics-actions";
import Typography from "material-ui/es/Typography/Typography";
import {errorLabelStyle} from "../styles/index";
import Card from "material-ui/es/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";

class OverallSumSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {searchResults, error, handleSearchRequest} = this.props;

        return <div>
            <OverallSumSearchForm onFormSubmitted={handleSearchRequest}/>

            {error != undefined
                ? <Typography variant="body1" style={errorLabelStyle}>
                    Во время поиска произошла ошибка. Сервер ответил со статусом {error.status}. Пожалуйста, попробуйте позде.
                </Typography>
                : ''
            }

            {searchResults != undefined && searchResults.length !== 0
                ? <Card>
                    <CardContent>
                        <OverallSumTable dataSource={searchResults}/>
                    </CardContent>
                </Card>
                : <Typography variant="body1">Поиск не дал результатов.</Typography>

            }

        </div>
    }
}

OverallSumSearchPage.propTypes = {
    searchResults: PropTypes.array,
    error: PropTypes.object,
    handleSearchRequest: PropTypes.func
};

const mapStateToProps = (state) => {
    const {overallSumSearchPage} = state;
    const {overallSumSearchInfo} = overallSumSearchPage;

    return {
        searchResults: overallSumSearchInfo.searchResults,
        error: overallSumSearchInfo.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (financialAccount) => dispatch(fetchOverallSumOfFinancialAccounts(financialAccount))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OverallSumSearchPage);