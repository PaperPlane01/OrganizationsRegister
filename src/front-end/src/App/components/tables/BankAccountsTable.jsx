import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import {Link} from "react-router-dom";
import sort from 'fast-sort';

class BankAccountsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'bankAccountID', numeric: true, disablePadding: false, label: 'Код банковского счёта'},
                {id: 'bank', numeric: false, disablePadding: false, label: 'Банк'},
                {id: 'organization', numeric: false, disablePadding: false, label: 'Организация'}
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

        let dataSource = this.state.dataSource;

        switch (orderBy) {
            case 'bank':
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc([(bankAccount) => bankAccount.bank.name])
                        : sort(dataSource).asc([(bankAccount) => bankAccount.bank.name]);

                this.setState({dataSource, order, orderBy});
                return;
            case 'organization':
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc([(bankAccount) => bankAccount.organization.fullName])
                        : sort(dataSource).asc([(bankAccount) => bankAccount.organization.fullName]);

                this.setState({dataSource, order, orderBy});
                return;
            default:
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc([(bankAccount) => bankAccount.id])
                        : sort(dataSource).asc([(bankAccount) => bankAccount.id]);

                this.setState({dataSource, order, orderBy});
                return;
        }
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