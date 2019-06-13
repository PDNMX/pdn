import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import {Typography} from "@material-ui/core"
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
