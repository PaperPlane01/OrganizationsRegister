import React from 'react';
import OrganizationsTable from '../components/tables/OrganizationsTable.jsx';
import OrganizationsSearchForm from '../components/forms/OrganizationsSearchForm.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {searchOrganizationsByCriteria} from "../actions/organizations-actions";
import Typography from "material-ui/es/Typography/Typography";

class OrganizationsSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <OrganizationsSearchForm onFormSubmitted={this.props.handleSearchRequest}/><br/>

            <div id={'searchResults'}>
                {this.props.searchResults !== undefined && this.props.searchResults.length !== 0
                    ? <OrganizationsTable dataSource={this.props.searchResults}/>
                    : <Typography variant="body1">Поиск не дал результатов.</Typography>
                }
            </div>
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