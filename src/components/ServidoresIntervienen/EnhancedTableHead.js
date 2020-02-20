import React from "react";
import PropTypes from 'prop-types';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import {Typography} from "@material-ui/core"
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    tableHead: {
        color: theme.palette.black.color
    },
});

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy, classes,columnData} = this.props;

        const columnData_ = columnData.filter(c => c.mostrar === true );

        return (
            <TableHead style={{backgroundColor:'#f5f5f5'}}>
                <TableRow>
                    {
                        columnData_.map((column, index) => {
                            return (
                                <TableCell
                                    key={index}
                                    numeric={column.numeric}
                                    padding={column.disablePadding ? 'none' : 'default'}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    <Tooltip
                                        title="Ordenar"
                                        placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={order}
                                            onClick={this.createSortHandler(column.id)}
                                        >
                                            <Typography className={classes.tableHead} variant={"body1"}>
                                                {column.label}
                                            </Typography>
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            );
                        })
                    }
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
};
export default withStyles(styles)(EnhancedTableHead);