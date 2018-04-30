import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {EconomicActivitiesSearchForm} from '../components/forms';
import Typography from "material-ui/es/Typography/Typography";
import {EconomicActivitiesTable} from "../components/tables";
import Card from "material-ui/es/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import {searchEconomicActivitiesByCriteria} from "../actions/economic-activites-actions";

class EconomicActivitiesSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <EconomicActivitiesSearchForm
                onFormSubmitted={(searchCriteria) => this.props.handleSearchRequest(searchCriteria)}
            />

            {(this.props.searchResults != undefined && this.props.searchResults.length !== 0)
                ? <Card>
                    <CardContent>
                        <EconomicActivitiesTable dataSource={this.props.searchResults}/>
                    </CardContent>
                </Card>
                : <Typography variant='body1'>
                    Поиск не дал результатов.
                </Typography>
            }
        </div>
    }
}

EconomicActivitiesSearchPage.propTypes = {
    handleSearchRequest: PropTypes.func,
    searchResults: PropTypes.array
};

const mapStateToProps = (state) => {
    const {economicActivitiesSearch} = state.economicActivitiesSearchPage;

    return {
        searchResults: economicActivitiesSearch.searchResults
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchEconomicActivitiesByCriteria(searchCriteria))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EconomicActivitiesSearchPage);