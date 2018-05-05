import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import sort from 'fast-sort';
import {Link} from "react-router-dom";

class FinancialAccountsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'name', numeric: false, disablePadding: false, label: 'Название бухгалтерского счёта'},
                {id: 'organizationName', numeric: false, disablePadding: false, label: 'Организация'}
            ],
            order: 'asc',
            orderBy: 'name'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: nextProps.dataSource});
    }

    handleSortRequest = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        let dataSource = this.state.dataSource;

        dataSource =
            order === 'desc'
                ? sort(dataSource).desc(financialAccount => financialAccount[orderBy])
                : sort(dataSource).asc(financialAccount => financialAccount[orderBy]);

        this.setState({dataSource, order, orderBy});
    };

    render() {
        const {dataSource, order, orderBy, columnData} = this.state;

        return <div>
            <Table>
                <TableHeaderWithSorting order={order}
                                        orderBy={orderBy}
                                        columnData={columnData}
                                        onRequestSort={this.handleSortRequest}
                />
                <TableBody>
                    {dataSource.map(financialAccount => (<TableRow key={financialAccount.name}>
                        <TableCell>
                            {financialAccount.name}
                        </TableCell>
                        <TableCell>
                            <Link to={'/organizations-register/'.concat('organizations/')
                                .concat(financialAccount.organization.bin)}>
                                {financialAccount.organization.fullName}
                            </Link>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </div>
    }
}

FinancialAccountsTable.propTypes = {
    dataSource: PropTypes.array
};

export default FinancialAccountsTable;