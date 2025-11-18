import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
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

const DownloadSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none", // ✅ Esto funciona porque TableContainer renderiza Paper
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 700,
  fontSize: "1.1rem",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  borderBottom: "none", // 👈 Esto elimina el borde inferior por defecto
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

  const comiteRectorData = {
    ASOFIS: [
      "Auditoría Superior de la Federación",
      "Órgano Superior de Auditoría y Fiscalización Gubernamental de Colima",
      "Auditoría Superior del Estado de Hidalgo",
      "Auditoría Superior del Estado de Jalisco",
      "Auditoría Superior del Estado de Sinaloa",
    ],
    CPCEF: [
      "Secretaría de la Función Pública",
      "Contraloría General del Estado de Baja California Sur",
      "Secretaría de la Contraloría del Estado de Campeche",
      "Secretaría de la Contraloría General del Estado de Sonora",
    ],
  };

  const comiteRectorUrl =
    "https://www.snf.org.mx/informaci%C3%B3n-general-del-comit%C3%A9-rector.aspx";

  return (
    <>
      <DataGridBase
        title="Directorio de Miembros del SNF"
        descriptionItems={descriptionItems}
        data={{ ...miembrosSNF, columns }}
      />

      <DownloadSection>
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
                        href={comiteRectorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography variant="body2">
                          {comiteRectorData.ASOFIS[index]}
                        </Typography>
                      </DownloadLink>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    {comiteRectorData.CPCEF[index] && (
                      <DownloadLink
                        href={comiteRectorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography variant="body2">
                          {comiteRectorData.CPCEF[index]}
                        </Typography>
                      </DownloadLink>
                    )}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </DownloadSection>

      <DownloadSection>
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
      </DownloadSection>
    </>
  );
};

export default TablaConsulta;
