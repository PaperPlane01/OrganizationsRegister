import React from 'react';
import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableHeaderWithSorting from "./TableHeaderWithSorting.jsx";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class FinancialStatisticsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [
                {id: 'organizationName', numeric: false, disablePadding: false, label: 'Название организации'},
                {id: 'year', numeric: true, disablePadding: false, label: 'Год'},
                {id: 'quarter', numeric: true, disablePadding: false, label: 'Квартал'},
                {id: 'sum', numeric: true, disablePadding: false, label: 'Сумма'},
                {id: 'attribute', numeric: false, disablePadding: false, label: 'Признак'}
            ],
            order: 'asc',
            orderBy: 'year'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: nextProps.dataSource});
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        if (orderBy === 'year') {
            let dataSource = this.state.dataSource.sort((a, b) => {
                if (a.year === b.year) {
                    if (order === 'desc') {
                        return (a.quarter > b.quarter ? 1 : -1);
                    } else {
                        return (a.quarter > b.quarter ? -1 : 1);
                    }
                } else {
                    if (order === 'desc') {
                        return (a.year > b.year ? 1 : -1);
                    } else {
                        return (a.year > b.year ? -1 : 1);
                    }
                }
            });

            this.setState({dataSource, order, orderBy});
            return;
        }

        const dataSource =
            order === 'desc'
                ? this.state.dataSource.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.dataSource.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ dataSource, order, orderBy });
    };

    render() {
        const { dataSource, order, orderBy, columnData} = this.state;
        let paperStyle = {
            width: '100%',
            overflowX: 'auto',
        };

        return <Paper style={paperStyle}>
            <Table>
                <TableHeaderWithSorting order={order}
                                        orderBy={orderBy}
                                        columnData={columnData}
                                        onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                    {dataSource.map(financialStatistics => {
                        return (
                            <TableRow key={financialStatistics.id}>
                                <TableCell>
                                    <Link to={"/organizations-register/organizations/".concat(financialStatistics.organization.bin)}>
                                        {financialStatistics.organization.fullName}
                                    </Link>
                                </TableCell>
                                <TableCell numeric>{financialStatistics.year}</TableCell>
                                <TableCell numeric>{financialStatistics.quarter}</TableCell>
                                <TableCell numeric>{financialStatistics.sum}</TableCell>
                                <TableCell>{financialStatistics.attribute === 'debit' ? 'Дебит' : 'Кредит'}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Paper>
    }
}

FinancialStatisticsTable.propTypes = {
    dataSource: PropTypes.array
};

export default FinancialStatisticsTable;