import React from "react";
import {TableHead, TableRow, TableCell, Typography} from "@mui/material";
import {withStyles} from '@mui/styles';

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
