import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from "material-ui/es/Typography/Typography";
import {fetchTaxesCommitteeById} from "../actions/taxes-committees-actions";
import {exceptions} from "../constants/exception-constants";

class TaxesCommitteePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTaxesCommittee(this.props.match.params.id);
    }

    render() {
        const {taxesCommittee, error} = this.props;

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
                </CardContent>
            </Card>
        </div>
    }
}

TaxesCommitteePage.propTypes = {
    fetchTaxesCommittee: PropTypes.func,
    taxesCommittee: PropTypes.object,
    error: PropTypes.string
};

const mapStateToProps = (state) => {
    const {taxesCommitteePage} = state;

    return {
        taxesCommittee: taxesCommitteePage.taxesCommittee,
        error: taxesCommitteePage.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTaxesCommittee: (id) => dispatch(fetchTaxesCommitteeById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxesCommitteePage);