import { Box, Paper, Typography } from "@mui/material";

const AnalyticsMetricCard = ({ label, value, subtitle, accent = "#713972" }) => (
  <Paper
    elevation={0}
    sx={{
      width: "100%",
      minWidth: 0,
      boxSizing: "border-box",
      p: 2,
      border: "1px solid rgba(113, 57, 114, 0.15)",
      borderTop: `4px solid ${accent}`,
      borderRadius: 2,
      backgroundColor: "#fff",
    }}
  >
    <Typography
      variant="caption"
      sx={{
        display: "block",
        minHeight: { sm: 38 },
        color: "text.secondary",
        fontWeight: 700,
        lineHeight: 1.35,
      }}
    >
      {label}
    </Typography>
    <Box sx={{ mt: 0.75 }}>
      <Typography
        component="p"
        sx={{
          color: accent,
          fontSize: { xs: "1.45rem", md: "1.7rem" },
          fontWeight: 800,
          lineHeight: 1.15,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
      {subtitle && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 0.75, color: "text.secondary" }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  </Paper>
);

export default AnalyticsMetricCard;
