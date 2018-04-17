import React from 'react';
import PropTypes from 'prop-types';
import Table, {
    TableBody,
    TableCell,
    TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableHeaderWithSorting from './TableHeaderWithSorting.jsx';
import {Link} from "react-router-dom";

class OrganizationsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            columnData: [{id: 'bin', numeric: true, disablePadding: false, label: 'БИН'},
                {id: 'fullName', numeric: false, disablePadding: false, label: 'Полное название'},
                {id: 'shortName', numeric: false, disablePadding: false, label: 'Сокращённое название'},
                {id: 'organizationType', numeric: false, disablePadding: false, label: 'Тип'},
                {id: 'registrationDate', numeric: false, disablePadding: false, label: 'Дата регистрации'},
                {id: 'numberOfEmployees', numeric: true, disablePadding: false, label: 'Количество сотрудников'},
                {id: 'primaryEconomicActivity', numeric: false, disablePadding: false, label: 'Основная деятельность'},
                {id: 'founder', numeric: false, disablePadding: false, label: 'Учредитель'},
                {id: 'address', numeric: false, disablePadding: false, label: 'Адрес'},
                {id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Номер телефона'},
                {id: 'taxesCommittee', numeric: false, disablePadding: false, label: 'Налоговый комитет'}],
            order: 'asc',
            orderBy: 'fullName',
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

        this.setState({ dataSource, order, orderBy });
    };

    render() {
        const { dataSource, order, orderBy, columnData} = this.state;
        let paperStyle = {
            width: '100%',
            overflowX: 'auto',
        };

        return <Paper style={paperStyle}>
            <div>
                <Table>
                    <TableHeaderWithSorting order={order}
                                            orderBy={orderBy}
                                            columnData={columnData}
                                            onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {dataSource.map(organization => {
                            return (
                                <TableRow key={organization.bin}>
                                    <TableCell numeric>{organization.bin}</TableCell>
                                    <TableCell>
                                        {<Link to={"/organizations-register/organizations/".concat(organization.bin)}>
                                            {organization.fullName}
                                        </Link>}
                                    </TableCell>
                                    <TableCell>{organization.shortName !== null ? organization.shortName : '-'}</TableCell>
                                    <TableCell>{organization.organizationType.name}</TableCell>
                                    <TableCell>{organization.registrationDate}</TableCell>
                                    <TableCell numeric>{organization.numberOfEmployees}</TableCell>
                                    <TableCell>{organization.primaryEconomicActivity.name}</TableCell>
                                    <TableCell>{organization.founder}</TableCell>
                                    <TableCell>{organization.address}</TableCell>
                                    <TableCell>{organization.phoneNumber}</TableCell>
                                    <TableCell>{organization.taxesCommittee.name}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    }
}

OrganizationsTable.propTypes = {
    dataSource: PropTypes.array
};

export default OrganizationsTable;