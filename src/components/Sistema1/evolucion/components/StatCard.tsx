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
        height: "100%",
        p: 3,
        border: "1px solid",
        borderColor: "background.border",
        borderRadius: 3,
        backgroundColor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
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
          }}
        >
          <Icon />
        </Box>

        <Box sx={{ minWidth: 0 }}>
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
            sx={{ mt: 1, fontWeight: 700, color: "text.primary" }}
          >
            {label}
          </Typography>
        </Box>
      </Box>

      {subLabel ? (
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid rgba(88, 49, 113, 0.14)",
            color: "text.secondary",
          }}
        >
          {subLabel}
        </Typography>
      ) : null}
    </Paper>
  );
};

export default StatCard;
