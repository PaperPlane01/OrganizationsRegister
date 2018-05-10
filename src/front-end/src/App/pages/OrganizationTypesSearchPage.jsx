import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {OrganizationTypesSearchForm} from '../components/forms';
import Typography from "material-ui/Typography";
import Card, {CardContent} from "material-ui/Card";
import {OrganizationTypesTable} from '../components/tables';
import {searchOrganizationTypesByCriteria} from "../actions/organizations-types-actions";

class OrganizationTypesSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleSearchRequest, searchResults} = this.props;

        return <div>
            <OrganizationTypesSearchForm onFormSubmitted={handleSearchRequest}/>

            {searchResults == undefined || searchResults.length === 0
                ? <Typography variant="body1">Поиск не дал результатов.</Typography>
                : <Card>
                    <CardContent>
                        <OrganizationTypesTable dataSource={searchResults}/>
                    </CardContent>
                </Card>}
        </div>
    }
}

OrganizationTypesSearchPage.propTypes = {
    handleSearchRequest: PropTypes.func,
    searchResults: PropTypes.array
};

const mapStateToProps = (state) => {
    const {searchResults} = state.organizationTypesSearchPage.organizationTypesSearch;

    return {
        searchResults: searchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchOrganizationTypesByCriteria(searchCriteria))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTypesSearchPage);