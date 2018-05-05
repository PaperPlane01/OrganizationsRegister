import React from 'react';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableHeaderWithSorting from "./TableHeaderWithSorting.jsx";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import sort from 'fast-sort';

class FinancialStatisticsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [
                {id: 'organization', numeric: false, disablePadding: false, label: 'Предприятие'},
                {id: 'financialAccount', numeric: false, disablePadding: false, label: 'Бухгалтеркский счёт'},
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

        let dataSource = this.state.dataSource;

        switch (orderBy) {
            case 'year':
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc([
                            financialStatistics => financialStatistics.year,
                            financialStatistics => financialStatistics.quarter,
                            financialStatistics => financialStatistics.organization.fullName
                        ])
                        : sort(dataSource).asc([
                            financialStatistics => financialStatistics.year,
                            financialStatistics => financialStatistics.quarter,
                            financialStatistics => financialStatistics.organization.fullName
                        ]);
                this.setState({dataSource, order, orderBy});
                return;
            case 'organization':
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc(financialStatistics => financialStatistics.organization.fullName)
                        : sort(dataSource).asc(financialStatistics => financialStatistics.organization.fullName);
                this.setState({dataSource, order, orderBy});
                return;
            case financialAccount:
                dataSouce =
                    order === 'desc'
                        ? sort(dataSource).desc(financialStatistics => financialStatistics.financialAccount.name)
                        : sort(dataSource).asc(financialStatistics => financialStatistics.financialAccount.name);
                this.setState({dataSource, order, orderBy});
                return;
            default:
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc(financialStatistics => financialStatistics[orderBy])
                        : sort(dataSource).asc(financialStatistics => financialStatistics[orderBy]);
                this.setState({dataSource, order, orderBy});
        }
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
                                    <Link to={"/organizations-register/organizations/"
                                        .concat(financialStatistics.organization.bin)}>
                                        {financialStatistics.organization.fullName}
                                    </Link>
                                </TableCell>
                                <TableCell>{financialStatistics.financialAccount.name}</TableCell>
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