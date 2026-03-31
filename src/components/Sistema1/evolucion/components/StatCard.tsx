import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface Props {
  value: string | number;
  label: string;
  subLabel?: string;
  icon: React.ElementType;
  accentColor: string;
  accentSoftColor: string;
}

const StatCard: React.FC<Props> = ({
  value,
  label,
  subLabel,
  icon: Icon,
  accentColor,
  accentSoftColor,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: 0,
        p: { xs: 2, md: 2.25 },
        border: "1px solid",
        borderColor: "background.border",
        borderRadius: 3,
        backgroundColor: "background.paper",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: 0 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "14px",
              backgroundColor: accentSoftColor,
              color: accentColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              mb: 1.25,
            }}
          >
            <Icon />
          </Box>

          <Typography
            component="p"
            sx={{
              fontSize: { xs: "2rem", md: "2.35rem" },
              lineHeight: 1,
              fontWeight: 700,
              color: accentColor,
            }}
          >
            {value}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ mt: 1, fontWeight: 700, color: "text.primary", overflowWrap: "anywhere" }}
          >
            {label}
          </Typography>
        </Box>

        {subLabel ? (
          <Typography
            variant="body2"
            sx={{
              pt: 1.25,
              borderTop: "1px solid rgba(88, 49, 113, 0.14)",
              color: "text.secondary",
              fontWeight: 700,
              textAlign: "center",
              overflowWrap: "anywhere",
            }}
          >
            {subLabel}
          </Typography>
        ) : null}
      </Box>
    </Paper>
  );
};

export default StatCard;
