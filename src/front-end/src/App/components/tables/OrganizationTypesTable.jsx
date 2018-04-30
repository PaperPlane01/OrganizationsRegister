import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';

class OrganizationTypesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'name', numeric: false, disablePadding: false, label: 'Название'}],
            order: 'asc',
            orderBy: 'name'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: nextProps.dataSource});
    }

    handleSortRequest = (event, property) => {
        handleSortRequest = (event, property) => {
            const orderBy = property;
            let order = 'desc';

            if (this.state.orderBy === property && this.state.order === 'desc') {
                order = 'asc';
            }

            let dataSource = this.state.dataSource;

            if (order === 'desc') {
                dataSource = this.state.dataSource.sort((a, b) => {
                    if (typeof a[orderBy] === 'string') {
                        return a[orderBy].localeCompare(b[orderBy]) * (-1);
                    } else {
                        return b[orderBy] < a[orderBy] ? -1 : 1
                    }
                })
            } else {
                dataSource = this.state.dataSource.sort((a, b) => {
                    if (typeof a[orderBy] === 'string') {
                        return a[orderBy].localeCompare(b[orderBy]);
                    } else {
                        return a[orderBy] < b[orderBy] ? -1 : 1
                    }
                })
            }

            this.setState({dataSource: dataSource});
        };
    };

    render() {
        const {dataSource, order, orderBy, columnData} = this.state;

        return <div>
            <Table>
                <TableHeaderWithSorting order={order}
                                        orderBy={orderBy}
                                        columnData={columnData}
                />
                <TableBody>
                    {dataSource.map(organizationType => (<TableRow key={organizationType.id}>
                        <TableCell>{organizationType.name}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </div>
    }
}

OrganizationTypesTable.propTypes = {
    dataSource: PropTypes.array
};

export default OrganizationTypesTable;