import React from 'react';
import OrganizationsTable from '../components/OrganizationsTable.jsx';
import OrganizationsSearchForm from '../components/OrganizationsSearchForm.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {searchOrganizationsByCriteria} from "../actions/organizations-actions";

class OrganizationsSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <OrganizationsSearchForm onFormSubmitted={this.props.handleSearchRequest}/><br/>

            {this.props.searchResults !== undefined && this.props.searchResults.length !== 0
                ? <OrganizationsTable dataSource={this.props.searchResults}/>
                : <p>Поиск не дал результатов.</p>
            }
        </div>
    }
}

OrganizationsSearchPage.propTypes = {
    handleSearchRequest: PropTypes.func,
    searchResults: PropTypes.array
};

const mapStateToProps = (state) => {
    let organizationsSearch = state.organizationsSearch;

    return {
        searchResults: organizationsSearch.searchedOrganizations.payload.data.organizationsSearchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        handleSearchRequest: (searchCriteria) => dispatch(searchOrganizationsByCriteria(searchCriteria))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsSearchPage);