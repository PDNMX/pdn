import React from "react";
import PropTypes from 'prop-types';
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import Typography from "@material-ui/core/Typography/Typography";
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
        const {order, orderBy, classes,columnData,acciones} = this.props;
        return (
            <TableHead style={{backgroundColor:'#f5f5f5'}}>
                <TableRow>
                    {
                        columnData.map(column => {
                        if (column.mostrar) {
                            return (
                                <TableCell
                                    key={column.id}
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
                                            <Typography className={classes.tableHead} variant={"body2"}>
                                                {column.label}
                                            </Typography>
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            );
                        }
                    }, this)
                    }
                    {
                        this.props.acciones &&
                        <TableCell>
                            {
                                <Typography className={classes.tableHead} variant={"body2"}>
                                    Acciones
                                </Typography>
                            }
                        </TableCell>
                    }


                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
export default withStyles(styles)(EnhancedTableHead);
