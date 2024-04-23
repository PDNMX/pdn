import { Typography, Grid, Paper, Box } from "@mui/material";
import { withStyles } from "@mui/styles";
import HeaderV2 from "../HomeV2/HeaderV2";
import pdnRoutes from "../../routes";
import working from "../../assets/rediseno2023/imgs/iconos/ico-construccion.svg";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    /*         backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundPosition: 'fixed',
        color: '#f2f2f2' */
  },
  item: {
    maxWidth: 1200,
    padding: theme.spacing(1),
    paddingTop: 90,
    paddingBottom: 90,
  },
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: "10px 10px 10px 10px",
    display: "flex",
    justifyContent: "center",
  },
  box: {
    maxWidth: "900px",
    paddingTop: "50px",
    paddingBottom: "50px",
  },
  erizo: {
    width: "350px",
    paddingTop:"50px",
    paddingBottom:"50px",
  },
});

const index = (props) => {
  const { classes } = props;
  const system = pdnRoutes.find((route) => route.path === "/fiscalizacion");

  return (
    <div className={classes.root}>
      <HeaderV2 section={system} />
      <Grid container justifyContent="center">
        <Grid item xs={12} className={classes.item}>
          <Paper elevation={15} className={classes.paper}>
            <Box className={classes.box}>
              <Typography variant="h4" align="center">
                Sistema en construcción
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <img
                    alt="enConstruccion"
                    src={working}
                    className={classes.erizo}
                  />
                </Box>
                <Box
                  sx={{
                    maxWidth: "800px",
                  }}
                >
                  <Typography paragraph>
                    Estamos trabajando en el desarrollo del Sistema de
                    información y comunicación del Sistema Nacional
                    Anticorrupción y del Sistema Nacional de Fiscalización.
                  </Typography>
                  <Typography paragraph>
                    El objeto del sistema es permitir la centralización de la
                    información que generan los órganos integrantes del Sistema
                    Nacional de Fiscalización, con la finalidad de ampliar la
                    cobertura e impacto de la fiscalización de recursos
                    federales y locales mediante la construcción de un modelo de
                    coordinación entre la federación, los estados y los
                    municipios.
                  </Typography>

                  <Typography paragraph>
                    Este Sistema se encuentra en proceso de consulta con el
                    Comité Rector del Sistema Nacional de Fiscalización.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(index);
