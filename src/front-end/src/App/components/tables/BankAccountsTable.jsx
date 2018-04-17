import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import {Link} from "react-router-dom";

class BankAccountsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'bankAccountID', numeric: true, disablePadding: false, label: 'Код банковского счёта'},
                {id: 'bankName', numeric: false, disablePadding: false, label: 'Банк'},
                {id: 'organizationName', numeric: false, disablePadding: false, label: 'Название организации'}
            ],
            order: 'asc',
            orderBy: 'bankAccountID'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: nextProps.dataSource});
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const dataSource =
            order === 'desc'
                ? this.state.dataSource.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.dataSource.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ dataSource, order, orderBy });
    };

    render() {
        const { dataSource, order, orderBy, columnData} = this.state;

        return <div>
                <Table>
                    <TableHeaderWithSorting order={order}
                                            orderBy={orderBy}
                                            columnData={columnData}
                                            onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {dataSource.map(bankAccount => {
                            return (
                                <TableRow key={bankAccount.id}>
                                    <TableCell>{bankAccount.id}</TableCell>
                                    <TableCell>{bankAccount.bank.name}</TableCell>
                                    <TableCell>
                                        <Link to={"/organizations-register/organizations/"
                                            .concat(bankAccount.organization.bin)}>
                                            {bankAccount.organization.fullName}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
        </div>
    }
}

BankAccountsTable.propTypes = {
    dataSource: PropTypes.array
};

export default BankAccountsTable;