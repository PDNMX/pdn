import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import GavelIcon from "@mui/icons-material/Gavel";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import WorkIcon from "@mui/icons-material/Work";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

import { Typography } from "@mui/material/";

import { nanoid } from "nanoid";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props) {
  const dataProps = JSON.parse(props.criterios);
  /* console.log(dataProps); */
  const etiquetas = [];
  for (let key in dataProps) {
    //let temp = [];
    let obj = {};
    let value = dataProps[key];
    if (value === "any" || value === null) {
      value = "";
    }
    //console.log(value)
    if (
      value &&
      (!Array.isArray(value)) &&
      (value !== undefined )&&
      (value !== null )||
      (value.length > 0 ) &&
      (value.nombre && value.nombre !== null )||
      (value.name && value.name !== null)
    ) {
      switch (key) {
        case "nombres":
        case "primerApellido":
        case "segundoApellido":
          obj = { id: nanoid(), key: 0, label: value };
          etiquetas.push(obj);
          break;
        case "institucion":
        case "institucionS2":
          obj = { id: nanoid(), key: 1, label: value.nombre };
          etiquetas.push(obj);
          break;
        case "buyer_name":
          obj = { id: nanoid(), key: 1, label: value.name };
          etiquetas.push(obj);
          break;
        case "supplier":
          obj = { id: nanoid(), key: 1, label: value };
          etiquetas.push(obj);
          break;
        case "tipoSancion":
          obj = { id: nanoid(), key: 2, label: "tipoSanción" };
          etiquetas.push(obj);
          break;
        case "nombreRazonSocial":
          obj = { id: nanoid(), key: 3, label: value };
          etiquetas.push(obj);
          break;
        case "tipoProcedimientoContratacion":
          obj = {
            id: nanoid(),
            key: 4,
            label: "tipoProcedimientoContratacion",
          };
          etiquetas.push(obj);
          break;
        case "empleoCargoComision":
          obj = { id: nanoid(), key: 5, label: value };
          etiquetas.push(obj);
          break;
        case "bienServicioOtorgado":
          obj = { id: nanoid(), key: 6, label: value };
          etiquetas.push(obj);
          break;
        case "tipoContratacion":
          obj = { id: nanoid(), key: 7, label: value };
          etiquetas.push(obj);
          break;
        default:
          console.log("no hay opción");
      }
    }
  }

  /* const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  }; */

  return (
    <>
      {etiquetas.length > 0 ? (
        <>
          <Typography
            style={{ color: "#E1E8EB", fontSize: "22px", fontWeight: 500 }}
          >
            Filtros de búsqueda:
          </Typography>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0,
              m: 0,
              backgroundColor: "rgb(41 89 116 / 0%)",
            }}
            component="ul"
            elevation={0}
          >
            {etiquetas.map((data, index) => {
              let icon;
              icon = <SentimentNeutralIcon />;
              if (data.key === 0) {
                icon = <PersonIcon />;
              } else if (data.key === 1) {
                icon = <BusinessIcon />;
              } else if (data.key === 2) {
                icon = <GavelIcon />;
              } else if (data.key === 3) {
                icon = <PermContactCalendarIcon />;
              } else if (data.key === 4) {
                icon = <GavelIcon />;
              } else if (data.key === 5) {
                icon = <WorkIcon />;
              } else if (data.key === 6) {
                icon = <ShoppingCartIcon />;
              } else if (data.key === 7) {
                icon = <HandshakeIcon />;
              }

              return (
                <ListItem key={index}>
                  <Chip
                    color="info"
                    icon={icon}
                    label={data.label}
                    /* onDelete={handleDelete(data)} */
                  />
                </ListItem>
              );
            })}
          </Paper>
        </>
      ) : (
        <>
        </>
      )}
    </>
  );
}
