import React from "react";
import { withStyles } from "@mui/styles";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link as RouterLink, useParams } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import estados from "../Cobertura/estados.json";
//import ReactGA from "react-ga4";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
// const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs"/>;

const styles = (theme) => ({
  whiteText: {
    color: theme.palette.greyColor,
  },
  icon: {
    maxWidth: 100,
    /* [theme.breakpoints.up("md")]: {
      marginRight: 80,
    },
    [theme.breakpoints.down("md")]: {
      marginRight: 10,
      marginLeft: 10,
    }, */
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  breadcrumItem: {
    maxWidth: 1200,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.opaque + "80", // 80 hex => 128 dec => 50%
  },
  containerName: {
    maxWidth: 1200,
    margin: "auto",
    minHeight: 200,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
});

function useIsWidthUp(breakpoint) {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
}

function HeaderV2(props) {
  const { classes, section } = props;
  const isXsUp = useIsWidthUp("md");
  const { id_estado } = useParams();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} className={classes.breadcrumItem}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: "#824E80", paddingTop: "10px" }}
          >
            <Link
              component={RouterLink}
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="#824E80"
              to="/"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Plataforma Digital Nacional
            </Link>

            {section.path.includes("/especificaciones/") && (
              <Link
                component={RouterLink}
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="#824E80"
                to="/especificaciones"
              >
                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Especificaciones
              </Link>
            )}

            {section.path.includes("/:id_estado") && (
              <Link
                component={RouterLink}
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="#824E80"
                to="/cobertura"
              >
                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Cobertura
              </Link>
            )}

            <Typography
              color={section.color}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {section.path.includes("/:id_estado")
                ? estados.find((e) => e.route.includes(id_estado)).name
                : section.shortName}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.containerName}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
      >
        <Grid item xs={12} md={9} align={"center"}>
          {section.icon && (
            <img src={section.icon} alt="PDN" className={classes.icon} />
          )}
          <Typography
            variant="h4"
            paragraph
            color={`${section.color}`}
            style={{ fontWeight: 100 }}
          >
            {section.name}
          </Typography>
          {section.subName && (
            <Typography variant={"h5"} color={`${section.color}`}>
              {section.subName}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

//export default withWidth()(withStyles(styles)(HeaderV2));
export default withStyles(styles)(HeaderV2);
