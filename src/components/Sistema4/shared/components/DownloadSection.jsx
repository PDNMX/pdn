import React from "react";
import { Box, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { dataGridStyles } from "../../styles/dataGridStyles";

const DownloadSection = ({ classes, title, children }) => {
  return (
    <Box className={classes.root}>
      {title && (
        <Box p={1} pb={2}>
          <Typography variant="h6" className={classes.sectionTitle} gutterBottom>
            <b>{title}</b>
          </Typography>
        </Box>
      )}
      <Box className={classes.dataGridContainer}>
        {children}
      </Box>
    </Box>
  );
};

export default withStyles(dataGridStyles)(DownloadSection);
