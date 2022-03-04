import React from 'react';
import {Typography, Grid} from "@mui/material";
import {withStyles} from "@mui/styles";
import bgimg from "../../assets/rediseno/fondo_cruces.png";
import HeaderV2 from '../HomeV2/HeaderV2';
import pdnRoutes from "../../routes";

const styles = theme => ({
    root: {
        flexGrow :1,
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed"
    },
    rootItem: {
        maxWidth: 1200,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    }
});

const CustomTypography = withStyles({
    root: {
        color: "#d0d7d9",
        backgroundAttachment: "fixed"
    }
})(Typography);

const index = props => {
    const { classes } = props;
    const system = pdnRoutes.find(route => route.path==='/denuncias');

    return <div className={classes.root}>
        <HeaderV2 section = {system}/>
        <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.rootItem}>
                <CustomTypography variant="h4" paragraph>
                    Sistema 5
                </CustomTypography>

                <CustomTypography>
                    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                </CustomTypography>
                <CustomTypography>
                    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                </CustomTypography>
                <CustomTypography>
                    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
                </CustomTypography>
            </Grid>
        </Grid>
    </div>
}

export default withStyles(styles)(index);