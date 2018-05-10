import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {EconomicActivitiesSearchForm} from '../components/forms';
import Typography from "material-ui/Typography";
import {EconomicActivitiesTable} from "../components/tables";
import Card, {CardContent} from "material-ui/Card";
import {searchEconomicActivitiesByCriteria} from "../actions/economic-activites-actions";
import {fetchCurrentUser} from "../actions/user-actions";

class EconomicActivitiesSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn && this.props.currentUser == undefined) {
            this.props.fetchCurrentUser();
        }
    }

    render() {
        let displayUpdateDialog = false;

        if (this.props.userLoggedIn && this.props.currentUser != undefined) {
            if (this.props.currentUser.roles.map(role => (role.name)).includes('admin')) {
                displayUpdateDialog = true;
            }
        }

        return <div>
            <EconomicActivitiesSearchForm
                onFormSubmitted={(searchCriteria) => this.props.handleSearchRequest(searchCriteria)}
            />

            {(this.props.searchResults != undefined && this.props.searchResults.length !== 0)
                ? <Card>
                    <CardContent>
                        <EconomicActivitiesTable dataSource={this.props.searchResults}
                                                 displayUpdateDialog={displayUpdateDialog}
                        />
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
    searchResults: PropTypes.array,
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func
};

const mapStateToProps = (state) => {
    const {userData} = state;
    const {economicActivitiesSearch} = state.economicActivitiesSearchPage;

    return {
        searchResults: economicActivitiesSearch.searchResults,
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchEconomicActivitiesByCriteria(searchCriteria)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EconomicActivitiesSearchPage);