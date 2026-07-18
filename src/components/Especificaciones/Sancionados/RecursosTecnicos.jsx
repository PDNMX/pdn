import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GitHubIcon from "@mui/icons-material/GitHub"; // Cambiado el ícono
import CodeIcon from "@mui/icons-material/Code";
import SecurityIcon from "@mui/icons-material/Security";
import ButtonPDN from "../../Compartidos/ButtonPDN";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  cardContainer: {
    height: "100%",
    border: `1px solid ${theme.palette.background.border}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      boxShadow: theme.shadows[4],
    },
    transition: "box-shadow 0.3s ease-in-out",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(4),
    "&:last-child": {
      paddingBottom: theme.spacing(4),
    },
  },
  icon: {
    fontSize: 40,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 500,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  cardDescription: {
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  sectionTitle: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    marginBottom: theme.spacing(4),
  },
  buttonWrapper: {
    marginBottom: "auto",
    display: "flex",
    justifyContent: "flex-start",
  },
});

const RecursosTecnicos = ({ classes }) => {
  const recursos = [
    {
      title: "Diccionario de datos",
      description:
        "Consulta la documentación detallada sobre la estructura y significado de los campos de datos",
      icon: MenuBookIcon,
      buttonUrl:
        "https://docs.google.com/spreadsheets/d/1HIFQpR1O26c2rjYKATm15-0AsxyyPn1JOSwHfKQ29Tk/edit?gid=507089592#gid=507089592",
    },
    {
      title: "Repositorio de GitHub",
      description: "Accede al código fuente del proyecto y sus componentes",
      icon: GitHubIcon,
      buttonUrl: "https://github.com/PDNMX/herramienta-capturador-s3", 
    },
    {
      title: "Documentación Open API",
      description:
        "Explora las especificaciones técnicas de la API y sus endpoints",
      icon: CodeIcon,
      buttonUrl: "https://www.plataformadigitalnacional.org/oas/ui/?urls.primaryName=S3%20-%20Sancionados%20-%20v2",
    },
    {
      title: "Seguridad",
      description:
        "Información sobre los protocolos y medidas de seguridad implementados",
      icon: SecurityIcon,
      buttonUrl:
        "https://drive.google.com/file/d/1-IvF3KYa5rups73BmVV4W8glT9csVGY9/view",
    },
  ];

  const ResourceCard = ({
    title,
    description,
    icon: Icon,
    buttonComponent,
  }) => (
    <Card className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <Box>
          <Icon className={classes.icon} />
        </Box>
        <Typography variant="h6" className={classes.cardTitle}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.cardDescription}>
          {description}
        </Typography>
        <div className={classes.buttonWrapper}>{buttonComponent}</div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Typography variant="h5" className={classes.sectionTitle}>
        Recursos Técnicos para Implementación
      </Typography>
      <Grid container spacing={3}>
        {recursos.map((recurso, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6
            }}>
            <ResourceCard
              {...recurso}
              buttonComponent={
                <ButtonPDN href={recurso.buttonUrl} target="_blank">
                  Más información
                </ButtonPDN>
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

RecursosTecnicos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecursosTecnicos);
