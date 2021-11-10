import React from "react";
import PropTypes from 'prop-types';
import {TableHead, TableRow, TableCell, Tooltip, TableSortLabel, Typography} from "@mui/material";
import {withStyles} from '@mui/styles';


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
                                            <Typography className={classes.tableHead} variant={"body1"}>
                                                {column.label}
                                            </Typography>
                                        </TableSortLabel>
                                    </Tooltip>
                                </TableCell>
                            );
                        }
                        return true;
                    }, this)
                    }
                    {
                        this.props.acciones &&
                        <TableCell>
                            {
                                <Typography className={classes.tableHead} variant={"body1"}>
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
};
export default withStyles(styles)(EnhancedTableHead);
