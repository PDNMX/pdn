import React from "react";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import {Typography} from "@material-ui/core"
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    tableHead: {
        color: theme.palette.black.color
    },
});

const EnhancedTableHead = props => {
    const { classes,columnData} = props;
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
                                padding={column.disablePadding ? 'none' : 'normal'}
                            >
                                <Typography className={classes.tableHead} variant={"body1"}>
                                    {column.label}
                                </Typography>
                            </TableCell>
                        );
                    })
                }
            </TableRow>
        </TableHead>
    );
};

export default withStyles(styles)(EnhancedTableHead);
