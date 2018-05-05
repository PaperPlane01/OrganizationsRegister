import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import sort from 'fast-sort';

class EconomicActivitiesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'name', numeric: false, disablePadding: false, label: 'Название хозяйственной деятельности'}],
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
                ? sort(dataSource).desc(organizationType => organizationType[orderBy])
                : sort(dataSource).asc(organizationType => organizationType[orderBy]);

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
                    {dataSource.map(economicActivity => (<TableRow key={economicActivity.name}>
                        <TableCell>
                            {economicActivity.name}
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </div>
    }
}

EconomicActivitiesTable.propTypes = {
    dataSource: PropTypes.array
};

export default EconomicActivitiesTable;