import React from "react";
import { Box, Typography } from "@mui/material";

const TabButton = ({ selected, icon, label, onClick, classes }) => {
  return (
    <Box
      onClick={onClick}
      className={selected ? classes.tabCardSelected : classes.tabCard}
    >
      {icon && <Box className={classes.tabIcon}>{icon}</Box>}
      <Typography variant="subtitle1" className={classes.tabLabel}>
        {label}
      </Typography>
    </Box>
  );
};

export default TabButton;