import React from 'react';
import {FinancialStatisticsSearchForm} from '../components/forms';
import PropTypes from 'prop-types';
import {FinancialStatisticsTable} from "../components/tables";
import {searchFinancialStatisticsByCriteria} from "../actions/financial-statistics-actions";
import {connect} from 'react-redux';
import Typography from "material-ui/Typography";
import {fetchCurrentUser} from "../actions/user-actions";

class FinancialStatisticsSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn) {
            if (this.props.currentUser == undefined) {
                this.props.fetchCurrentUser();
            }
        }
    };

    render() {
        let displayUpdateDialog = false;

        if (this.props.userLoggedIn) {
            if (this.props.currentUser != undefined
                && this.props.currentUser.roles.map(role => (role.name)).includes('admin')) {
                displayUpdateDialog = true;
            }
        }
        return <div>
        <FinancialStatisticsSearchForm onFormSubmitted={(searchCriteria) => this.props.handleSearchRequest(searchCriteria)}/>

        {this.props.searchResults == undefined || this.props.searchResults.length === 0
            ? <Typography variant="body1" >Поиск не дал результатов</Typography>
            : <FinancialStatisticsTable dataSource={this.props.searchResults} displayUpdateDialog={displayUpdateDialog}/>
        }
    </div>
    }
}

FinancialStatisticsSearchPage.propTypes = {
    searchResults: PropTypes.array,
    handleSearchRequest: PropTypes.func,
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func
};

const mapStateToProps = (state) => {
    const {financialStatisticsSearch, userData} = state;

    return {
        searchResults: financialStatisticsSearch.financialStatistics.data.searchResults,
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchFinancialStatisticsByCriteria(searchCriteria)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialStatisticsSearchPage);