import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {BanksSearchForm} from '../components/forms';
import {searchBanksByCriteria} from "../actions/bank-actions";
import Typography from "material-ui/es/Typography/Typography";
import {BanksTable} from "../components/tables";
import Card from "material-ui/es/Card/Card";
import CardContent from "material-ui/es/Card/CardContent";
import {fetchCurrentUser} from "../actions/user-actions";

class BanksSearchPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn) {
            if (this.props.currentUser == undefined) {
                this.props.fetchCurrentUser();
            }
        }
    }

    render() {
        const {userLoggedIn, currentUser, handleSearchRequest, searchResults} = this.props;

        let displayUpdateDialog = false;

        if (userLoggedIn) {
            if (currentUser != undefined) {
                if (currentUser.roles.map(role => (role.name)).includes('admin')) {
                    displayUpdateDialog = true;
                }
            }
        }

        return <div>
            <BanksSearchForm onFormSubmitted={handleSearchRequest}/>

            {searchResults == undefined || searchResults.length === 0
                ? <Typography variant="body1">Поиск не дал результатов</Typography>
                : <Card>
                    <CardContent>
                        <BanksTable dataSource={searchResults} displayUpdateDialog={displayUpdateDialog}/>
                    </CardContent>
                </Card>
            }
        </div>
    }
}

BanksSearchPage.propTypes = {
    handleSearchRequest: PropTypes.func,
    searchResults: PropTypes.array,
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func
};

const mapStateToProps = (state) => {
    const {banksSearch} = state.banksSearchPage;
    const {userData} = state;

    return {
        searchResults: banksSearch.searchResults,
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchRequest: (searchCriteria) => dispatch(searchBanksByCriteria(searchCriteria)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BanksSearchPage);