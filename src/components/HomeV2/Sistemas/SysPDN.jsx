import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import {Typography} from "@mui/material";
import { withStyles, useTheme } from "@mui/styles";
import SysCard from "./SysCard";
import IconS1 from "../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s1.svg";
import IconS2 from "../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s2.svg";
import IconS3 from "../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s3.svg";
import IconS4 from "../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s4.svg";
import IconS5 from "../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s5.svg";
import IconS6 from "../../../assets/rediseno2023/imgs/iconos/sistemas/ico_s6.svg";

const styles = () => ({
  root: {
    maxWidth: 1500,
  },
});

const systems = [
  {
    name: "Sistema de Declaraciones",
    color: "#F29888",
    icon: IconS1,
    url: "/declaraciones",
  },
  {
    name: "Sistema de Servidores Públicos en contrataciones",
    color: "#b25fac",
    icon: IconS2,
    url: "/servidores",
  },
  {
    name: "Sistema de Sancionados",
    color: "#9085da",
    icon: IconS3,
    url: "/sancionados",
  },
  {
    name: "Sistema de Fiscalización",
    color: "#88bc69",
    icon: IconS4,
    url: "/fiscalizacion",
  },
  {
    name: "Sistema de Denuncias",
    color: "#34c9b2",
    icon: IconS5,
    url: "/denuncias",
  },
  {
    name: "Sistema de Contrataciones",
    color: "#42a5cc",
    icon: IconS6,
    url: "/contrataciones",
  },
];

const SysPDN = (props) => {
  const { classes } = props;
  const theme = useTheme();

  const justify = useMediaQuery(theme.breakpoints.down("md"))
    ? "center"
    : "space-evenly";

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={12} className={classes.root}>
          <Typography variant="h4" style={{ marginTop: '40px', fontWeight: 'bold' }} paragraph>
            Sistemas de la <br></br>Plataforma Digital Nacional
          </Typography>
        </Grid>
        <Grid item md={12} className={classes.root}>
        <Typography variant="h6" style={{ textAlign: 'justify' }}paragraph>
            El desarrollo de la <b>PDN</b> considera seis sistemas que integran
            datos estratégicos para la lucha contra la corrupción, contemplados
            en la{" "}
            <b>Ley General del Sistema Nacional Anticorrupción (LGSNA).</b>
          </Typography>
        </Grid>

        <Grid
          display="flex"
          flexWrap="wrap"
          justifyContent={justify}
          className={classes.root}
          marginTop={'10px'}
        >
          {systems.map((s, i) => {
            return <SysCard key={i} sys={s} />;
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(SysPDN);
