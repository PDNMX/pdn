import { useEffect, useRef } from "react";
import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
import SnfParticipationMap from "./SnfParticipationMap";
import DataGridBase from "../../shared/components/DataGridBase";
import {
  Box,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { styled } from "@mui/system";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid rgba(224, 224, 224, 1)`,
  boxShadow: "none",
}));

const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: "#713972",
}));

const StyledHeaderCell = styled(TableCell)(() => ({
  color: "#fff",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "16px",
  textAlign: "center",
  borderBottom: "1px solid rgba(224, 224, 224, 1)",
  borderRight: "1px solid rgba(255, 255, 255, 0.3)",
  "&:last-child": {
    borderRight: "none",
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: "16px",
  textAlign: "center",
  borderBottom: "1px solid rgba(224, 224, 224, 1)",
  borderRight: "1px solid rgba(224, 224, 224, 1)",
  "&:last-child": {
    borderRight: "none",
  },
}));

const DownloadLink = styled(Link)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  textDecoration: "none",
  color: theme.palette.primary.main,
  transition: "all 0.2s",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.dark,
  },
}));

const PdfIcon = styled(PictureAsPdfIcon)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "1.5rem",
}));

const HeaderLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: "1rem",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const NetworkFigure = styled("figure")(({ theme }) => ({
  margin: `0 0 ${theme.spacing(3)}`,
  padding: theme.spacing(2),
  border: "1px solid rgba(113, 57, 114, 0.16)",
  borderRadius: 16,
  background:
    "radial-gradient(circle at 50% 46%, rgba(113, 57, 114, 0.1), transparent 30%), linear-gradient(145deg, #ffffff 0%, #fbf8fc 100%)",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const NetworkViewport = styled(Box)(() => ({
  width: "100%",
  overflowX: "auto",
  scrollbarWidth: "thin",
}));

const NetworkSvg = styled("svg")(() => ({
  display: "block",
  width: "88%",
  maxWidth: 1056,
  minWidth: 760,
  height: "auto",
  margin: "0 auto",
  "& .network-edge": {
    fill: "none",
    strokeWidth: 2.5,
    opacity: 0.52,
  },
  "& .network-edge-halo": {
    fill: "none",
    stroke: "#fff",
    strokeWidth: 8,
    opacity: 0.82,
  },
  "& .network-node": {
    cursor: "pointer",
    outline: "none",
  },
  "& .network-node circle": {
    transition: "filter 180ms ease, stroke-width 180ms ease, transform 180ms ease",
    transformBox: "fill-box",
    transformOrigin: "center",
  },
  "& .network-node:hover circle, & .network-node:focus circle": {
    filter: "drop-shadow(0 7px 8px rgba(44, 24, 45, 0.22))",
    strokeWidth: 5,
    transform: "scale(1.035)",
  },
  "& .node-name": {
    fill: "#fff",
    fontSize: 13.5,
    fontWeight: 700,
    textAnchor: "middle",
    pointerEvents: "none",
  },
  "& .node-role": {
    fill: "rgba(255, 255, 255, 0.88)",
    fontSize: 10.5,
    fontWeight: 600,
    letterSpacing: 0.35,
    textAnchor: "middle",
    pointerEvents: "none",
  },
}));

const NetworkLegend = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: theme.spacing(1, 2.5),
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
  "& span": {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(0.75),
    fontSize: "0.8rem",
  },
  "& i": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
  },
}));

const ComiteRectorNetwork = ({ data }) => {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport && viewport.scrollWidth > viewport.clientWidth) {
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
    }
  }, []);

  const nodes = [
    {
      ...data.ASOFIS[0],
      id: "asf",
      x: 425,
      y: 105,
      color: "#713972",
      stroke: "#e8d643",
      lines: ["Auditoría Superior", "de la Federación"],
      role: "ASF · PRESIDENCIA",
    },
    {
      ...data.CPCEF[0],
      id: "sabg",
      x: 775,
      y: 105,
      color: "#713972",
      stroke: "#e8d643",
      lines: ["Secretaría", "Anticorrupción y", "Buen Gobierno"],
      role: "SABG · PRESIDENCIA",
    },
    {
      ...data.ASOFIS[1],
      id: "chiapas",
      x: 195,
      y: 225,
      color: "#a64f7a",
      stroke: "#f1c8dc",
      lines: ["Auditoría Superior", "de Chiapas"],
      role: "ASOFIS · ROTATORIO",
    },
    {
      ...data.ASOFIS[2],
      id: "hidalgo",
      x: 145,
      y: 440,
      color: "#a64f7a",
      stroke: "#f1c8dc",
      lines: ["Auditoría Superior", "de Hidalgo"],
      role: "ASOFIS · ROTATORIO",
    },
    {
      ...data.ASOFIS[3],
      id: "sinaloa",
      x: 330,
      y: 620,
      color: "#a64f7a",
      stroke: "#f1c8dc",
      lines: ["Auditoría Superior", "de Sinaloa"],
      role: "ASOFIS · ROTATORIO",
    },
    {
      ...data.CPCEF[1],
      id: "aguascalientes",
      x: 1005,
      y: 190,
      color: "#28777a",
      stroke: "#bfe2df",
      lines: ["Contraloría", "de Aguascalientes"],
      role: "CPCE-F · ROTATORIO",
    },
    {
      ...data.CPCEF[2],
      id: "puebla",
      x: 1070,
      y: 405,
      color: "#28777a",
      stroke: "#bfe2df",
      lines: ["Buen Gobierno", "de Puebla"],
      role: "CPCE-F · ROTATORIO",
    },
    {
      ...data.CPCEF[3],
      id: "michoacan",
      x: 930,
      y: 600,
      color: "#28777a",
      stroke: "#bfe2df",
      lines: ["Secretaría", "de Contraloría", "de Michoacán"],
      role: "CPCE-F · ROTATORIO",
    },
    {
      ...data.CPCEF[4],
      id: "chihuahua",
      x: 695,
      y: 665,
      color: "#28777a",
      stroke: "#bfe2df",
      lines: ["Función Pública", "de Chihuahua"],
      role: "CPCE-F · ROTATORIO",
    },
  ];

  return (
    <NetworkFigure>
      <Box textAlign="center" mb={1}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          Así se integra el Comité Rector del SNF
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Presidencia dual y siete integrantes rotatorios · periodo 2025–2027
        </Typography>
      </Box>

      <NetworkViewport ref={viewportRef}>
        <NetworkSvg
          viewBox="0 0 1200 755"
          role="img"
          aria-labelledby="comite-network-title comite-network-description"
        >
          <title id="comite-network-title">
            Integración del Comité Rector del Sistema Nacional de Fiscalización
          </title>
          <desc id="comite-network-description">
            La Auditoría Superior de la Federación y la Secretaría
            Anticorrupción y Buen Gobierno ejercen la presidencia dual, junto
            con siete integrantes rotatorios de ASOFIS y CPCE-F para el periodo
            2025 a 2027.
          </desc>

          <g aria-hidden="true">
            {nodes.map((node) => (
              <line
                key={`halo-${node.id}`}
                className="network-edge-halo"
                x1="600"
                y1="370"
                x2={node.x}
                y2={node.y}
              />
            ))}
            {nodes.map((node) => (
              <line
                key={`edge-${node.id}`}
                className="network-edge"
                x1="600"
                y1="370"
                x2={node.x}
                y2={node.y}
                stroke={node.color}
              />
            ))}
          </g>

          <g aria-hidden="true">
            <circle
              cx="600"
              cy="370"
              r="126"
              fill="rgba(232, 214, 67, 0.22)"
            />
            <circle
              cx="600"
              cy="370"
              r="113"
              fill="#fff"
              stroke="#713972"
              strokeWidth="4"
            />
            <text
              x="600"
              y="337"
              textAnchor="middle"
              fill="#713972"
              fontSize="22"
              fontWeight="800"
            >
              Comité Rector
            </text>
            <text
              x="600"
              y="364"
              textAnchor="middle"
              fill="#713972"
              fontSize="18"
              fontWeight="700"
            >
              del SNF
            </text>
            <line
              x1="542"
              y1="380"
              x2="658"
              y2="380"
              stroke="#e3d4e4"
              strokeWidth="2"
            />
            <text
              x="600"
              y="404"
              textAnchor="middle"
              fill="#5c5260"
              fontSize="12.5"
              fontWeight="600"
            >
              9 INTEGRANTES
            </text>
            <text
              x="600"
              y="425"
              textAnchor="middle"
              fill="#756d77"
              fontSize="11.5"
            >
              Presidencia dual + 7 rotatorios
            </text>
          </g>

          {nodes.map((node) => (
            <a
              className="network-node"
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${node.nombre}. Abrir sitio institucional`}
            >
              <title>{node.nombre}</title>
              <circle
                cx={node.x}
                cy={node.y}
                r="78"
                fill={node.color}
                stroke={node.stroke}
                strokeWidth="4"
              />
              <text
                className="node-name"
                x={node.x}
                y={node.y - (node.lines.length === 3 ? 20 : 10)}
              >
                {node.lines.map((line, index) => (
                  <tspan key={line} x={node.x} dy={index === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>
              <text className="node-role" x={node.x} y={node.y + 37}>
                {node.role}
              </text>
            </a>
          ))}
        </NetworkSvg>
      </NetworkViewport>

      <NetworkLegend aria-label="Clave de colores">
        <span>
          <i style={{ backgroundColor: "#713972" }} /> Presidencia dual
        </span>
        <span>
          <i style={{ backgroundColor: "#a64f7a" }} /> Integrantes ASOFIS
        </span>
        <span>
          <i style={{ backgroundColor: "#28777a" }} /> Integrantes CPCE-F
        </span>
      </NetworkLegend>

      <Typography
        component="figcaption"
        variant="caption"
        color="textSecondary"
        display="block"
        textAlign="center"
        mt={1.5}
      >
        Seleccione un nodo para abrir el sitio institucional. Fuente:{" "}
        <Link
          href="https://www.snf.org.mx/informaci%C3%B3n-general-del-comit%C3%A9-rector.aspx"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontWeight: 600 }}
        >
          Sistema Nacional de Fiscalización
        </Link>
        .
      </Typography>
    </NetworkFigure>
  );
};

const TablaConsulta = () => {
  const { miembrosSNF } = useSistema4Data();

  const descriptionItems = [
    "En esta sección puede consultar los miembros del Sistema Nacional de Fiscalización (SNF) organizados por el Comité Rector y grupos de trabajo.",
    "El Comité Rector está integrado por la Auditoría Superior de la Federación (ASF) y representantes de la Asociación Nacional de Organismos de Fiscalización Superior y Control Gubernamental (ASOFIS) y la Comisión Permanente de Contralores Estados-Federación (CPCE-F).",
    <>
      <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
        Seleccione los nodos de la red para explorar la participación de los
        integrantes en los grupos de trabajo.
      </Box>
      <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
        Utilice los filtros de la tabla para buscar por ente público,
        responsable, grupo de trabajo o filial (ASOFIS/CPCE-F).
      </Box>
    </>,
  ];

  const comiteRectorDescriptionItems = [
    <>
      En este sentido el artículo 39 de la Ley General del Sistema Nacional Anticorrupción estipula que el SNF contará con un Comité Rector conformado por la Auditoría Superior de la Federación, la Secretaría de la Función Pública (ahora Secretaría Anticorrupción y Buen Gobierno (SABG)) y siete miembros rotatorios de entre las instituciones referidas que serán elegidos por periodos de dos años, por consenso de la propia Secretaría de la Función Pública (ahora SABG) y la Auditoría Superior de la Federación, y que el Comité Rector será presidido de manera dual por el Auditor Superior de la Federación y el titular de la Secretaría de la Función Pública (ahora SABG), o por los representantes que de manera respectiva designen para estos efectos.{" "}
      <Link
        href="https://www.snf.org.mx/comit%C3%A9-rector.aspx"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontWeight: 600 }}
      >
        Fuente
      </Link>
    </>,
  ];

  const directorioDescriptionItems = [
    <>
      En esta sección puede descargar los directorios actualizados de las
      Entidades Fiscalizadoras Superiores Locales (EFSL), así como las
      Secretarías o Instancias Homólogas encargadas del Control Interno en las
      Entidades Federativas (OEC).{" "}
      <Link
        href="https://www.sesna.gob.mx/2018/04/17/informe-anual-de-fiscalizacion-2017/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontWeight: 600 }}
      >
        Fuente
      </Link>
    </>,
    "Los directorios incluyen información de contacto.",
  ];

  const comiteRectorData = {
    ASOFIS: [
      {
        nombre: "Auditoría Superior de la Federación",
        url: "https://www.asf.gob.mx/Default/Index",
      },
      {
        nombre: "Auditoría Superior del Estado de Chiapas",
        url: "https://www.asechiapas.gob.mx/",
      },
      {
        nombre: "Auditoría Superior del Estado de Hidalgo",
        url: "https://www.aseh.gob.mx/",
      },
      {
        nombre: "Auditoría Superior del Estado de Sinaloa",
        url: "https://www.ase-sinaloa.gob.mx/",
      },
    ],
    CPCEF: [
      {
        nombre: "Secretaría Anticorrupción y Buen Gobierno",
        url: "https://www.gob.mx/buengobierno",
      },
      {
        nombre: "Contraloría del Estado de Aguascalientes",
        url: "https://www.aguascalientes.gob.mx/Contraloria/",
      },
      {
        nombre:
          "Secretaría Anticorrupción y Buen Gobierno del Estado de Puebla",
        url: "https://sabg.puebla.gob.mx/index.php",
      },
      {
        nombre: "Secretaría de Contraloría del Estado de Michoacán de Ocampo",
        url: "https://secoem.michoacan.gob.mx/",
      },
      {
        nombre: "Secretaría de la Función Pública del Estado de Chihuahua",
        url: "https://chihuahua.gob.mx/tax-portal-principal/secretaria-funcion-publica",
      },
    ],
  };

  return (
    <>
      <DataGridBase
        title="Integrantes del Comité Rector"
        descriptionItems={comiteRectorDescriptionItems}
      >
        <ComiteRectorNetwork data={comiteRectorData} />
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell colSpan={2}>
                  <HeaderLink
                    href="https://www.snf.org.mx/informaci%C3%B3n-general-del-comit%C3%A9-rector.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Comité Rector del SNF
                  </HeaderLink>
                </StyledHeaderCell>
              </TableRow>
              <TableRow>
                <StyledHeaderCell>
                  <HeaderLink
                    href="http://www.asofis.org.mx/Default/Index"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ASOFIS
                  </HeaderLink>
                </StyledHeaderCell>
                <StyledHeaderCell>
                  <HeaderLink
                    href="https://comisioncontralores.gob.mx/2023/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CPCE-F
                  </HeaderLink>
                </StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {Array.from({
                length: Math.max(
                  comiteRectorData.ASOFIS.length,
                  comiteRectorData.CPCEF.length
                ),
              }).map((_, index) => (
                <TableRow key={index}>
                  <StyledTableCell>
                    {comiteRectorData.ASOFIS[index] && (
                      <DownloadLink
                        href={comiteRectorData.ASOFIS[index].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography variant="body2">
                          {comiteRectorData.ASOFIS[index].nombre}
                        </Typography>
                      </DownloadLink>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {comiteRectorData.CPCEF[index] && (
                      <DownloadLink
                        href={comiteRectorData.CPCEF[index].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography variant="body2">
                          {comiteRectorData.CPCEF[index].nombre}
                        </Typography>
                      </DownloadLink>
                    )}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </DataGridBase>
      <DataGridBase
        title="Integrantes del SNF"
        descriptionItems={descriptionItems}
        data={{ ...miembrosSNF, columns }}
        gridSx={{ display: { xs: "flex", sm: "none" } }}
        searchContainerSx={{ display: { xs: "block", sm: "none" } }}
        beforeGrid={
          <SnfParticipationMap
            rows={miembrosSNF.rows}
            loading={miembrosSNF.loading}
            error={miembrosSNF.error}
          />
        }
      />
      <DataGridBase
        title="Directorio del SNF"
        descriptionItems={directorioDescriptionItems}
      >
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell colSpan={2}>
                  <HeaderLink
                    href="https://www.snf.org.mx/directorio.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentos disponibles para descarga
                  </HeaderLink>
                </StyledHeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              <TableRow>
                <StyledTableCell>
                  <DownloadLink
                    href="https://www.snf.org.mx/SharedFiles/Download.aspx?pageid=13&mid=212&fileid=485"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PdfIcon />
                    <Typography variant="body1">
                      Directorio EFSL v.Jul 2024.pdf
                    </Typography>
                  </DownloadLink>
                </StyledTableCell>
                <StyledTableCell>
                  <DownloadLink
                    href="https://www.snf.org.mx/SharedFiles/Download.aspx?pageid=13&mid=212&fileid=486"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PdfIcon />
                    <Typography variant="body1">
                      Directorio OEC v. Jul 2024.pdf
                    </Typography>
                  </DownloadLink>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>
      </DataGridBase>
    </>
  );
};

export default TablaConsulta;
