import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ResponsiveBar } from "@nivo/bar";

const compactNumberFormatter = new Intl.NumberFormat("es-MX", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 2,
});

const formatAxisValue = (value, amount) =>
  amount ? `$${compactNumberFormatter.format(value)}` : compactNumberFormatter.format(value);

const formatTooltipValue = (value, amount) =>
  amount ? `$${numberFormatter.format(value)}` : numberFormatter.format(value);

const AnalyticsBarChart = ({
  title,
  description,
  data,
  keys,
  labels,
  colors,
  amount = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const visibleData = data.filter((row) =>
    keys.some((key) => Number.isFinite(row[key]))
  );

  return (
    <Paper
      component="section"
      aria-label={title}
      elevation={0}
      sx={{
        height: "100%",
        p: { xs: 1.5, sm: 2 },
        border: "1px solid rgba(113, 57, 114, 0.15)",
        borderRadius: 2,
      }}
    >
      <Typography
        component="h4"
        variant="subtitle1"
        sx={{ color: "#713972", fontWeight: 700 }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      )}

      {visibleData.length === 0 ? (
        <Box
          role="status"
          sx={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          No hay datos para los filtros seleccionados.
        </Box>
      ) : (
        <Box sx={{ height: { xs: 330, md: 360 }, mt: 1 }}>
          <ResponsiveBar
            data={visibleData}
            keys={keys}
            indexBy="grupo"
            margin={{
              top: 20,
              right: 20,
              bottom: isMobile ? 92 : 70,
              left: amount ? 78 : 62,
            }}
            padding={0.3}
            innerPadding={3}
            groupMode="grouped"
            colors={colors}
            borderRadius={2}
            borderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
            enableLabel={false}
            axisBottom={{
              tickSize: 5,
              tickPadding: 6,
              tickRotation: isMobile ? -45 : -25,
              legend: "Desglose",
              legendPosition: "middle",
              legendOffset: isMobile ? 78 : 58,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: (value) => formatAxisValue(value, amount),
            }}
            gridYValues={5}
            legendLabel={(datum) => labels[datum.id] || datum.id}
            legends={
              keys.length > 1
                ? [
                    {
                      dataFrom: "keys",
                      anchor: "top",
                      direction: "row",
                      justify: false,
                      translateY: -18,
                      itemWidth: 125,
                      itemHeight: 18,
                      itemsSpacing: 8,
                      symbolSize: 10,
                    },
                  ]
                : []
            }
            tooltip={({ id, value, indexValue, color }) => (
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: 1,
                  backgroundColor: "#fff",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.22)",
                }}
              >
                <Typography variant="caption" sx={{ display: "block" }}>
                  {indexValue}
                </Typography>
                <Typography variant="body2" sx={{ color, fontWeight: 800 }}>
                  {labels[id] || id}: {formatTooltipValue(value, amount)}
                </Typography>
              </Box>
            )}
            role="img"
            ariaLabel={`${title}. Gráfica de barras`}
          />
        </Box>
      )}
    </Paper>
  );
};

export default AnalyticsBarChart;
