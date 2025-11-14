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
