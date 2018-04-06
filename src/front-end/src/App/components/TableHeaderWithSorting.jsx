import React from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import {Tooltip} from "material-ui";

class TableHeaderWithSorting extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy, columnData} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <Tooltip
                                    title="Отсортировать"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default TableHeaderWithSorting;