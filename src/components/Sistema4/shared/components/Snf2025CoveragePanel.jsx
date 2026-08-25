import React from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const INFORME_SNF_2025_URL =
  "https://www.snf.org.mx/SharedFiles/Download.aspx?fileid=490&mid=431&pageid=300";
const LGSNA_URL =
  "https://portalhcd.diputados.gob.mx/LeyesBiblio/PortalWeb/Leyes/Vigentes/PDF/LGSNA_200521.pdf";

const coverageIndicators = [
  {
    label: "Publican programas de auditoría",
    value: 78,
    count: "50 de 64 instituciones",
    detail: "32 EFSL + 18 OEC",
    color: "#713972",
  },
  {
    label: "Los publican anualmente",
    value: 66,
    count: "42 de 64 instituciones",
    detail: "29 EFSL + 13 OEC",
    color: "#9b5a18",
  },
  {
    label: "Publican informes de resultados",
    value: 86,
    count: "55 de 64 instituciones",
    detail: "31 EFSL + 24 OEC",
    color: "#4f8b3d",
  },
  {
    label: "Comunican proyectos y resultados",
    value: 61,
    count: "39 de 64 instituciones",
    detail: "27 EFSL + 12 OEC",
    color: "#356c87",
  },
];

const CoverageIndicator = ({ label, value, count, detail, color }) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      boxSizing: "border-box",
      p: 1.75,
      border: "1px solid rgba(113, 57, 114, 0.13)",
      borderRadius: 2,
      backgroundColor: "#fff",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 1,
        mb: 1.25,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          minHeight: { sm: "2.7em" },
          color: "text.primary",
          fontWeight: 700,
          lineHeight: 1.35,
        }}
      >
        {label}
      </Typography>
      <Typography
        component="span"
        sx={{ color, fontSize: "1.35rem", fontWeight: 800, lineHeight: 1 }}
      >
        {value}%
      </Typography>
    </Box>

    <LinearProgress
      variant="determinate"
      value={value}
      aria-label={`${label}: ${value}%`}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: `${color}1f`,
        "& .MuiLinearProgress-bar": {
          borderRadius: 4,
          backgroundColor: color,
        },
      }}
    />

    <Typography
      variant="caption"
      sx={{ display: "block", mt: 1.1, color: "text.secondary" }}
    >
      {count} · {detail}
    </Typography>
  </Box>
);

const Snf2025CoveragePanel = () => (
  <Box sx={{ p: { xs: 1, md: 2.5 }, pb: { xs: 0, md: 1 } }}>
    <Paper
      component="section"
      aria-labelledby="snf-coverage-title"
      elevation={0}
      sx={{
        p: { xs: 1.75, sm: 2.25 },
        border: "1px solid rgba(113, 57, 114, 0.18)",
        borderRadius: 2.5,
        background:
          "linear-gradient(135deg, rgba(113, 57, 114, 0.055), rgba(255, 255, 255, 0.98) 58%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
          <Box
            aria-hidden="true"
            sx={{
              display: { xs: "none", sm: "grid" },
              placeItems: "center",
              width: 42,
              height: 42,
              flex: "0 0 auto",
              borderRadius: 2,
              color: "#713972",
              backgroundColor: "rgba(113, 57, 114, 0.1)",
            }}
          >
            <AssessmentOutlinedIcon />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                mb: 0.4,
              }}
            >
              <Typography
                id="snf-coverage-title"
                component="h3"
                variant="h6"
                sx={{ color: "#713972", fontWeight: 800 }}
              >
                Disponibilidad pública reportada por el SNF
              </Typography>
              <Chip
                label="Informe 2025"
                size="small"
                sx={{
                  color: "#713972",
                  fontWeight: 700,
                  backgroundColor: "rgba(113, 57, 114, 0.09)",
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Encuesta aplicada a las 32 EFSL y los 32 OEC integrantes del SNF.
            </Typography>
          </Box>
        </Box>

        <Button
          component="a"
          href={INFORME_SNF_2025_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          size="small"
          endIcon={<OpenInNewIcon fontSize="small" />}
          sx={{
            flex: "0 0 auto",
            color: "#713972",
            borderColor: "rgba(113, 57, 114, 0.45)",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              borderColor: "#713972",
              backgroundColor: "rgba(113, 57, 114, 0.04)",
            },
          }}
        >
          Consultar informe
        </Button>
      </Box>

      <Grid
        container
        spacing={1.5}
        sx={{
          display: { xs: "none", sm: "flex" },
          mt: 0.75,
          "& > .MuiGrid-item": { display: "flex" },
        }}
      >
        {coverageIndicators.map((indicator) => (
          <Grid item sm={6} lg={3} key={indicator.label}>
            <CoverageIndicator {...indicator} />
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="caption"
        sx={{ display: "block", mt: 1.5, color: "text.secondary" }}
      >
        Fuente: Informe del Sistema Nacional de Fiscalización 2025, pp. 66–67.
        Los porcentajes corresponden a respuestas institucionales recabadas en
        enero de 2026; sirven como contexto nacional y no representan una
        medición de cumplimiento legal ni del avance del Sistema 4. El alcance
        mínimo del sistema se establece en el{" "}
        <Link
          href={LGSNA_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#713972", fontWeight: 700 }}
        >
          artículo 55 de la LGSNA
        </Link>
        .
      </Typography>
    </Paper>
  </Box>
);

export default Snf2025CoveragePanel;
