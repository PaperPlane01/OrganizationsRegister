import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card, { CardContent } from 'material-ui/Card';
import {fetchTaxesCommitteeById} from "../actions/taxes-committees-actions";
import {exceptions} from "../constants/exception-constants";
import {fetchCurrentUser} from "../actions/user-actions";
import {TaxesCommitteeUpdateDialog} from "../components/dialogs";
import Typography from "material-ui/Typography";

class TaxesCommitteePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn && this.props.currentUser == undefined) {
            this.props.fetchCurrentUser();
        }

        this.props.fetchTaxesCommittee(this.props.match.params.id);
    }

    render() {
        const {taxesCommittee, error, currentUser, userLoggedIn} = this.props;

        let displayTaxesCommitteeUpdateDialog = false;

        if (userLoggedIn) {
            if (currentUser != undefined) {
                if (currentUser.roles.map(role => (role.name)).includes('admin')) {
                    displayTaxesCommitteeUpdateDialog = true;
                }
            }
        }

        if (error != undefined) {
            if (error === exceptions.TAXES_COMMITTEE_NOT_FOUND) {
                return <Typography variant="body1">Налоговый комитет не найден.</Typography>
            } else {
                return <Typography variant="body1">Во время загрузки произошло что-то нехорошее. Мы уже работаем над этим!</Typography>
            }
        }

        if (taxesCommittee == undefined) {
            return <Typography variant="body1">Загрузка...</Typography>
        }

        return <div>
            <Card style={{marginBottom: '20px'}}>
                <Typography variant="headline">{taxesCommittee.name}</Typography>
                <CardContent>
                    <Typography variant="body1">Название: {taxesCommittee.name}</Typography>
                    <Typography variant="body1">Адрес: {taxesCommittee.address}</Typography>
                    {displayTaxesCommitteeUpdateDialog === true
                        ? <TaxesCommitteeUpdateDialog onUpdate={(taxesCommittee) => this.props.fetchTaxesCommittee(taxesCommittee.id)}
                                            taxesCommitteeId={taxesCommittee.id}
                        />
                        : ''}
                </CardContent>
            </Card>
        </div>
    }
}

TaxesCommitteePage.propTypes = {
    fetchTaxesCommittee: PropTypes.func,
    taxesCommittee: PropTypes.object,
    error: PropTypes.string,
    fetchCurrentUser: PropTypes.func,
    currentUser: PropTypes.object,
    userLoggedIn: PropTypes.bool
};

const mapStateToProps = (state) => {
    const {taxesCommitteePage, userData} = state;

    return {
        taxesCommittee: taxesCommitteePage.taxesCommittee,
        error: taxesCommitteePage.error,
        currentUser: userData.currentUser,
        userLoggedIn: userData.loggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTaxesCommittee: (id) => dispatch(fetchTaxesCommitteeById(id)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxesCommitteePage);