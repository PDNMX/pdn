import React from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

type RiskLevel = "none" | "low" | "medium" | "high";

interface RiskCardProps {
  title: string;
  count: number;
  percentage?: number;
  riskLevel: RiskLevel;
}

const riskConfig: Record<
  RiskLevel,
  {
    label: string;
    background: string;
    border: string;
    badgeBackground: string;
    badgeColor: string;
    accentColor: string;
    icon: React.ReactNode;
    helper: string;
  }
> = {
  none: {
    label: "Sin inconsistencias",
    background: "#f0f8f3",
    border: "#cfe7d6",
    badgeBackground: "#d4edda",
    badgeColor: "#155724",
    accentColor: "#155724",
    icon: <TaskAltIcon fontSize="small" />,
    helper: "No se detectaron declaraciones con observaciones en este eje.",
  },
  low: {
    label: "Inconsistencias menores",
    background: "#fffaf0",
    border: "#f5deb1",
    badgeBackground: "#fff3cd",
    badgeColor: "#856404",
    accentColor: "#856404",
    icon: <WarningAmberOutlinedIcon fontSize="small" />,
    helper: "El volumen de observaciones es acotado y requiere seguimiento.",
  },
  medium: {
    label: "Inconsistencias moderadas",
    background: "#fff6ef",
    border: "#f7d2b5",
    badgeBackground: "#f9e0cc",
    badgeColor: "#a35312",
    accentColor: "#a35312",
    icon: <WarningAmberOutlinedIcon fontSize="small" />,
    helper: "El eje concentra observaciones relevantes para revisar.",
  },
  high: {
    label: "Inconsistencias altas",
    background: "#fff1f0",
    border: "#f4c7c3",
    badgeBackground: "#f8d7da",
    badgeColor: "#721c24",
    accentColor: "#721c24",
    icon: <WarningAmberOutlinedIcon fontSize="small" />,
    helper: "El eje presenta el mayor nivel de observaciones del grupo.",
  },
};

const RiskCard: React.FC<RiskCardProps> = ({
  title,
  count,
  percentage,
  riskLevel,
}) => {
  const config = riskConfig[riskLevel] || riskConfig.none;

  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: 0,
        p: 2.5,
        border: "1px solid",
        borderColor: config.border,
        borderRadius: 3,
        backgroundColor: config.background,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.4, minWidth: 0, overflowWrap: "anywhere" }}
        >
          {title}
        </Typography>

        <Box sx={{ color: config.accentColor, display: "flex" }}>
          {config.icon}
        </Box>
      </Box>

      <Chip
        label={config.label}
        size="small"
        sx={{
          alignSelf: "flex-start",
          fontWeight: 700,
          backgroundColor: config.badgeBackground,
          color: config.badgeColor,
          borderRadius: "8px",
        }}
      />

      {riskLevel === "none" ? (
        <Typography variant="body2" sx={{ color: "text.secondary", mt: "auto", overflowWrap: "anywhere" }}>
          {config.helper}
        </Typography>
      ) : (
        <Box sx={{ mt: "auto" }}>
          <Typography
            component="p"
            sx={{ fontSize: "1.9rem", lineHeight: 1, fontWeight: 700, color: config.accentColor }}
          >
            {count}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary", overflowWrap: "anywhere" }}>
            {percentage}% de las declaraciones evaluadas en este eje.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default RiskCard;
