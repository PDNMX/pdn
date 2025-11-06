import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { dataGridLocaleText } from "./datagridLocaleText";
import { commonStyles } from "./datagridStyles";
import { dataGridSx } from "./datagridSx";

const DataGridBase = ({ classes, title, descriptionItems, data }) => {
  const { rows, columns, loading, error } = data;

  return (
    <Paper className={classes.paper} elevation={15}>
      <Box p={1}>
        <Typography paragraph>
          <b>{title}</b>
        </Typography>
        <ul className={classes.ul}>
          {descriptionItems.map((text, idx) => (
            <li key={idx} className={classes.li}>
              <Typography color="textPrimary" display="inline">
                {text}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>

      {error && (
        <Box className={classes.errorContainer}>
          <Typography color="error">
            <b>Error al cargar los datos:</b> {error}
          </Typography>
        </Box>
      )}

      <Box className={classes.dataGridContainer}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          localeText={dataGridLocaleText}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          filterMode="client"
          sx={dataGridSx}
        />
      </Box>
    </Paper>
  );
};

export default withStyles(commonStyles)(DataGridBase);
