import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TaxesCommitteesSearchForm} from '../components/forms';
import Typography from "material-ui/es/Typography/Typography";
import Card from "material-ui/es/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import {TaxesCommitteesTable} from '../components/tables';
import {searchTaxesCommitteesByCriteria} from "../actions/taxes-committees-actions";

class TaxesCommitteesSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <TaxesCommitteesSearchForm onFormSubmitted={this.props.handleSearchRequest}/>

            {this.props.searchResults == undefined || this.props.searchResults.length === 0
                ? <Typography variant="body1">Поиск не дал результатов</Typography>
                : <Card>
                    <CardContent>
                        <TaxesCommitteesTable dataSource={this.props.searchResults}/>
                    </CardContent>
                </Card>}
        </div>
    }
}

TaxesCommitteesSearchPage.propTypes = {
    handleSearchRequest: PropTypes.func,
    searchResults: PropTypes.array
};

const mapStateToProps = (state) => {
    const {taxesCommitteesSearch} = state.taxesCommitteesSearchPage;

    return {
        searchResults: taxesCommitteesSearch.searchResults
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchTaxesCommitteesByCriteria(searchCriteria))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxesCommitteesSearchPage);