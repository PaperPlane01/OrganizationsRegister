import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from "material-ui/es/Typography/Typography";
import {fetchBankById} from "../actions/bank-actions";
import {exceptions} from "../constants/exception-constants";

class BankPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchBank(this.props.match.params.id);
    }

    render() {
        const {bank, error} = this.props;

        if (error != undefined) {
            if (error === exceptions.BANK_NOT_FOUND) {
                return <Typography variant="body1">Банк не найден.</Typography>
            } else {
                return <Typography variant="body1">Во время загрузки произошло что-то нехорошее. Мы уже работаем над этим!</Typography>
            }
        }

        if (bank == undefined) {
            return <Typography variant="body1">Загрузка...</Typography>
        }

        return <div>
            <Card style={{marginBottom: '20px'}}>
                <Typography variant="headline">Банк "{bank.name}"</Typography>
                <CardContent>
                    <Typography variant="body1">Название: {bank.name}</Typography>
                    <Typography variant="body1">Адрес: {bank.address}</Typography>
                </CardContent>
            </Card>
        </div>
    }
}

BankPage.propTypes = {
    bank: PropTypes.object,
    fetchBank: PropTypes.func,
    error: PropTypes.string
};

const mapStateToProps = (state) => {
    const bankPage = state.bankPage;
    console.log(state);

    return {
        bank: bankPage.bank,
        error: bankPage.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBank: (id) => dispatch(fetchBankById(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankPage);