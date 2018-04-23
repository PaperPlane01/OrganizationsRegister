import React from 'react';
import FinancialStatisticsSearchForm from '../components/forms/FinancialStatisticsSearchForm.jsx';
import PropTypes from 'prop-types';
import FinancialStatisticsTable from "../components/tables/FinancialStatisticsTable.jsx";
import {loadFinancialStatistics} from "../actions/financial-statistics-actions";
import {connect} from 'react-redux';
import Typography from "material-ui/es/Typography/Typography";

class FinancialStatisticsSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { return <div>
        <FinancialStatisticsSearchForm onFormSubmitted={(bin, year, quarter) => this.props.handleSearchRequest(bin, year, quarter)}/>

        {this.props.searchResults == undefined || this.props.searchResults.length === 0
            ? <Typography variant="body1" >Поиск не дал результатов</Typography>
            : <FinancialStatisticsTable dataSource={this.props.searchResults}/>
        }
    </div>
    }
}

FinancialStatisticsSearchPage.propTypes = {
    searchResults: PropTypes.array,
    handleSearchRequest: PropTypes.func
};

const mapStateToProps = (state) => {
    let financialStatisticsSearch = state.financialStatisticsSearch;

    return {
        searchResults: financialStatisticsSearch.financialStatistics.data.searchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (bin, year, quarter) => dispatch(loadFinancialStatistics(bin, year, quarter))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialStatisticsSearchPage);