import React from 'react';
import {OrganizationsTable} from '../components/tables';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {clearOrganizationsSearchPageState, searchOrganizationsByCriteria} from "../actions/organizations-actions";
import Typography from "material-ui/es/Typography/Typography";
import {OrganizationsSearchForm} from '../components/forms';

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
    searchResults: PropTypes.array,
    clearState: PropTypes.array
};

const mapStateToProps = (state) => {
    let organizationsSearch = state.organizationsSearch;

    return {
        searchResults: organizationsSearch.searchedOrganizations.payload.data.organizationsSearchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        handleSearchRequest: (searchCriteria) => dispatch(searchOrganizationsByCriteria(searchCriteria)),
        clearState: () => dispatch(clearOrganizationsSearchPageState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsSearchPage);