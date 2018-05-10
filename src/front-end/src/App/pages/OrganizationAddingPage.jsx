import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {OrganizationAddingForm} from '../components/forms';
import {fetchCurrentUser} from "../actions/user-actions";
import Typography from "material-ui/Typography";
import {Link} from 'react-router-dom';
import {addOrganization} from "../actions/organizations-actions";

class OrganizationAddingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn !== false) {
            this.props.fetchCurrentUser();
        }
    }

    handleAddOrganizationRequest = (organization) => {
        this.props.saveOrganization(organization);
    };

    render() {
        if (this.props.userLoggedIn === false) {
            return <Typography variant="headline">
                Войдите в аккаунт, чтобы получить доступ к этой странице.
            </Typography>
        }

        if (this.props.currentUser === null) {
            return <Typography variant="headline">
                Загрузка...
            </Typography>
        }

        if (this.props.addedOrganizationBin != undefined) {
            return <Typography variant="headline">
                <Link to={'/organizations-register'.concat('/organizations/').concat('' + this.props.addedOrganizationBin)}>
                    Организация
                </Link> успешно добавлена!
            </Typography>
        }

        if (this.props.organizationAddingError != undefined) {
            return <Typography variant="headline">
                Во время попытки сохранить организацию произошла ошибка. Пожалуйста, попробуйте позже.
            </Typography>
        }


        if (!this.props.currentUser.roles.map(role => (role.name)).includes('admin')) {
            return <Typography variant="headline">
                У вас нет прав доступа к этой странице.
            </Typography>
        }

        return <div>
            <OrganizationAddingForm onFormSubmitted={(organization) => this.handleAddOrganizationRequest(organization)}/>
        </div>
    }
}

OrganizationAddingPage.propTypes = {
    userLoggedIn: PropTypes.object,
    currentUser: PropTypes.object,
    addedOrganizationBin: PropTypes.number,
    organizationAddingError: PropTypes.object,
    fetchCurrentUser: PropTypes.func,
    saveOrganization: PropTypes.func
};

const mapStateToProps = (state) => {
    const {loggedIn, currentUser} = state.userData;
    const {error, addedOrganizationBin} = state.organizationAdding;

    return {
        userLoggedIn: loggedIn,
        currentUser: currentUser,
        organizationAddingError: error,
        addedOrganizationBin: addedOrganizationBin
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(fetchCurrentUser()),
        saveOrganization: (organization) => dispatch(addOrganization(organization))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationAddingPage);