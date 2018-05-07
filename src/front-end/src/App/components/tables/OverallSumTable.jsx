import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import sort from 'fast-sort';

class OverallSumTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'financialAccount', numeric: true, disablePadding: false, label: 'Бухгалтерский счёт'},
                {id: 'overallSum', numeric: true, disablePadding: false, label: 'Общая сумма'}
            ],
            order: 'asc',
            orderBy: 'financialAccount'
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

        switch (orderBy) {
            case 'financialAccount':
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc(entry => entry.financialAccount.name)
                        : sort(dataSource).asc(entry => entry.financialAccount.name);
                this.setState({dataSource, order, orderBy});
                return;
            default:
                dataSource =
                    order === 'desc'
                        ? sort(dataSource).desc(entry => entry[orderBy])
                        : sort(dataSource).asc(entry => entry[orderBy]);
                this.setState({dataSource, order, orderBy});
                return;
        }
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
                    {dataSource.map((entry, index) => (<TableRow key={index}>
                        <TableCell>{entry.financialAccount.name}</TableCell>
                        <TableCell>{entry.overallSum}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </div>
    }
};

OverallSumTable.propTypes = {
    dataSource: PropTypes.array
};

export default OverallSumTable;