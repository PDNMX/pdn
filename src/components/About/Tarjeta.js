import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import {Typography} from "@mui/material"
//import Img from '../assets/banner1.png'

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE11.
        objectFit: 'cover',
    },
};

function ImgMediaCard(props) {
    const { classes, img, title, text, url } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea href={url}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    height="140"
                    image={img}//"/static/images/cards/contemplative-reptile.jpg"
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p" >
                        {text}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/*<CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>*/}
        </Card>
    );
}

ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
