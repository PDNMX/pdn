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

const TablaConsulta = () => {
  const { miembrosSNF } = useSistema4Data();

  const descriptionItems = [
    "En esta sección puede consultar los miembros del Sistema Nacional de Fiscalización (SNF) organizados por el Comité Rector y grupos de trabajo.",
    "El Comité Rector está integrado por la Auditoría Superior de la Federación (ASF) y representantes de la Asociación Nacional de Organismos de Fiscalización Superior y Control Gubernamental (ASOFIS) y la Comisión Permanente de Contralores Estados-Federación (CPCE-F).",
    "Utilice los filtros de la tabla para buscar por ente público, responsable, grupo de trabajo o filial (ASOFIS/CPCE-F).",
  ];

  const comiteRectorDescriptionItems = [
    <>
      El artículo 39 de la Ley General del Sistema Nacional Anticorrupción estipula que el SNF contará con un Comité Rector conformado por la Auditoría Superior de la Federación, la Secretaría de la Función Pública y siete miembros rotatorios de entre las instituciones referidas que serán elegidos por periodos de dos años, por consenso de la propia Secretaría de la Función Pública y la Auditoría Superior de la Federación, y que el Comité Rector será presidido de manera dual por el Auditor Superior de la Federación y el titular de la Secretaría de la Función Pública, o por los representantes que, de manera respectiva, designen para estos efectos.{" "}
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
      En esta sección puede descargar los directorios actualizados de las Entidades Fiscalizadoras Superiores Locales (EFSL), así como las Secretarías o Instancias Homólogas encargadas del Control Interno en las Entidades Federativas (OEC).{" "}
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
        nombre:
          "Órgano Superior de Auditoría y Fiscalización Gubernamental de Colima",
        url: "https://www.osaf.gob.mx/menu/quienes-somos",
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
        title="Integrantes del SNF"
        descriptionItems={descriptionItems}
        data={{ ...miembrosSNF, columns }}
      />
      <DataGridBase
        title="Integrantes del Comité Rector"
        descriptionItems={comiteRectorDescriptionItems}
      >
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
