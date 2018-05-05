import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import {BankUpdateDialog} from "../dialogs/";
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import {Link} from "react-router-dom";
import sort from 'fast-sort';

class BanksTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'name', numeric: false, disablePadding: false, label: 'Название банка'},
                {id: 'address', numeric: false, disablePadding: false, label: 'Адрес банка'}
            ],
            order: 'asc',
            orderBy: 'name'
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

        dataSource =
            order === 'desc'
                ? sort(dataSource).desc(bank => bank[orderBy])
                : sort(dataSource).asc(bank => bank[orderBy]);

        this.setState({dataSource, order, orderBy});
    };

    replaceBank = (updatedBank) => {
        console.log('replacing bank!');
        console.log(updatedBank);
        let dataSource = this.state.dataSource
            .map(bank => (bank.id === updatedBank.id
                ? updatedBank
                : bank));

        this.setState({dataSource});
    };

    render() {
        const {dataSource, order, orderBy, columnData} = this.state;
        const {displayUpdateDialog} = this.props;

        return <div>
            <Table>
                <TableHeaderWithSorting order={order}
                                        orderBy={orderBy}
                                        columnData={columnData}
                                        onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                    {dataSource.map(bank => {
                        return <TableRow key={bank.id}>
                            <TableCell>
                                <Link to={"/organizations-register/banks/".concat(bank.id)}>
                                    {bank.name}
                                </Link>
                            </TableCell>
                            <TableCell>{bank.address}</TableCell>
                            {displayUpdateDialog
                                ? <BankUpdateDialog bankID={bank.id}
                                                    onUpdate={(bank) => this.replaceBank(bank)}
                                                    clearStateAfterClosing={true}
                                />
                                : '' }
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    }
}

BanksTable.propTypes = {
    dataSource: PropTypes.array,
    displayUpdateDialog: PropTypes.bool
};

export default BanksTable;