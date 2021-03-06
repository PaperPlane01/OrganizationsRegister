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

class TaxesCommitteeTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'name', numeric: false, disablePadding: false, label: 'Название'},
                {id: 'address', numeric: false, disablePadding: false, label: 'Адрес'}
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
                ? sort(dataSource).desc(taxesCommittee => taxesCommittee[orderBy])
                : sort(dataSource).asc(taxesCommittee => taxesCommittee[orderBy]);

        this.setState({dataSource, order, orderBy});
    };

    render() {
        const {dataSource, order, orderBy, columnData} = this.state;

        return <div>
            <Table>
                <TableHeaderWithSorting order={order}
                                        orderBy={orderBy}
                                        columnData={columnData}
                                        onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                    {dataSource.map(taxesCommittee => {
                        return (<TableRow key={taxesCommittee.id}>
                            <TableCell>
                                <Link to={"/organizations-register/taxes-committees/".concat(taxesCommittee.id)}>
                                    {taxesCommittee.name}
                                    </Link>
                            </TableCell>
                            <TableCell>{taxesCommittee.address}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </div>
    }
}

TaxesCommitteeTable.propTypes = {
    dataSource: PropTypes.array
};

export default TaxesCommitteeTable;