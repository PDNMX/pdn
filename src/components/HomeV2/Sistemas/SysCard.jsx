import { Typography, Grid, CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ScrollAnimation from "../ScrollAnimation";

const styles = () => ({
  card: {
    /* border: "1px solid",
    borderRadius: "0.6em", */
    borderRadius: "0.6em",
    boxShadow:
      "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
    transition: "all ease 200ms",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow:
        "0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)",
    },
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    textAlign: "center",
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const SysCard = (props) => {
  const { classes, sys } = props;
  return (
    <Grid item lg={2} sm={4} xs={6} p={1}>
      <Card
        className={classes.card}
        component={RouterLink}
        to={sys.path}
        sx={{ backgroundColor: sys.color }}
      >
        <ScrollAnimation>
          <CardActionArea>
            <CardMedia
              component="img"
              /* height="auto" */
              image={sys.iconLight}
              alt={sys.name}
              sx={{
                backgroundColor: sys.color,
                objectFit: "scale-down",
                padding: "2rem",
                width: "auto",
              }}
            />
            <Typography mx={1} mb={2} color="#fff" variant="body1">
              {sys.name}
            </Typography>
            {/* <CardContent>
          </CardContent> */}
          </CardActionArea>
        </ScrollAnimation>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(SysCard);
