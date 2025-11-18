import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../../shared/components/DataGridBase";
import {
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
  backgroundColor: "#713972", // Color consistente con DataGrid
}));

const StyledHeaderCell = styled(TableCell)(() => ({
  color: "#fff",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "16px",
  textAlign: "center",
  borderBottom: "1px solid rgba(224, 224, 224, 1)",
  borderRight: "1px solid rgba(255, 255, 255, 0.3)", // Separador vertical blanco semi-transparente
  "&:last-child": {
    borderRight: "none", // Sin borde en la última celda
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  padding: "16px",
  textAlign: "center",
  borderBottom: "1px solid rgba(224, 224, 224, 1)",
  borderRight: "1px solid rgba(224, 224, 224, 1)", // Separador vertical
  "&:last-child": {
    borderRight: "none", // Sin borde en la última celda
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

const TablaConsulta = () => {
  const { miembrosSNF } = useSistema4Data();

  const descriptionItems = [
    "En esta sección puede consultar los miembros del Sistema Nacional de Fiscalización (SNF) organizados por el Comité Rector y grupos de trabajo.",
    "El Comité Rector está integrado por la Auditoría Superior de la Federación (ASF) y representantes de la Asociación Nacional de Organismos de Fiscalización Superior y Control Gubernamental (ASOFIS) y la Comisión Permanente de Contralores Estados-Federación (CPCE-F).",
    "Utilice los filtros de la tabla para buscar por ente público, responsable, grupo de trabajo o filial (ASOFIS/CPCE-F).",
  ];

  const comiteRectorDescriptionItems = [
    "El Comité Rector del Sistema Nacional de Fiscalización es el órgano de coordinación y toma de decisiones integrado por representantes de ASOFIS y CPCE-F.",
    "ASOFIS representa a las Auditorías Superiores Locales de fiscalización del país, mientras que CPCE-F agrupa a las Contralorías Estatales.",
  ];

  const directorioDescriptionItems = [
    "En esta sección puede descargar los directorios actualizados de las Entidades de Fiscalización Superior Locales (EFSL) y Órganos de Control Estatal (OCE).",
    "Los directorios incluyen información de contacto y estructura organizacional de las entidades fiscalizadoras.",
  ];

  const comiteRectorData = {
    ASOFIS: [
      {
        nombre: "Auditoría Superior de la Federación",
        url: "https://www.asf.gob.mx/Default/Index",
      },
      {
        nombre:
          "Órgano Superior de Auditoría y Fiscalización Gubernamental de Colima",
        url:
          "http://admiweb.col.gob.mx/archivos_prensa/banco_img/file_5c61c1f193297_Regl_interior_del_OSAFIG.pdf",
      },
      {
        nombre: "Auditoría Superior del Estado de Hidalgo",
        url: "https://www.aseh.gob.mx/",
      },
      {
        nombre: "Auditoría Superior del Estado de Jalisco",
        url: "https://www.asej.gob.mx",
      },
      {
        nombre: "Auditoría Superior del Estado de Sinaloa",
        url: "https://www.ase-sinaloa.gob.mx",
      },
    ],
    CPCEF: [
      {
        nombre: "Secretaría de la Función Pública",
        url:
          "https://www.gob.mx/cnts/acciones-y-programas/secretaria-de-la-funcion-publica",
      },
      {
        nombre: "Contraloría General del Estado de Baja California Sur",
        url: "https://contraloria.bcs.gob.mx",
      },
      {
        nombre: "Secretaría de la Contraloría del Estado de Campeche",
        url: "http://www.contraloria.campeche.gob.mx",
      },
      {
        nombre: "Secretaría de la Contraloría General del Estado de Sonora",
        url: "https://buengobierno.sonora.gob.mx/",
      },
    ],
  };

  return (
    <>
      <DataGridBase
        title="Integrantes del Comité Rector"
        descriptionItems={descriptionItems}
        data={{ ...miembrosSNF, columns }}
      />

      <DataGridBase title="Comité Rector" descriptionItems={comiteRectorDescriptionItems}>
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell colSpan={2}>
                  Comité Rector del SNF
                </StyledHeaderCell>
              </TableRow>
              <TableRow>
                <StyledHeaderCell>ASOFIS</StyledHeaderCell>
                <StyledHeaderCell>CPCE-F</StyledHeaderCell>
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

      <DataGridBase title="Directorio del SNF" descriptionItems={directorioDescriptionItems}>
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <StyledHeaderCell colSpan={2}>
                  Documentos disponibles para descarga
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
