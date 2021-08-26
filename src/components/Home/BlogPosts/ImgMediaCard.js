import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        maxWidth: 400,
        minHeight: 240,
        margin: theme.spacing(1),
    }
});

const ImgMediaCard = props => {
    const {classes, post} = props;
    return (
        <Card className={classes.card}>
            <CardActionArea onClick={ () => { window.location.href = post.url }}>
                <CardMedia
                    component="img"
                    alt="Blog PDN"
                    height="140"
                    image={post.feature_image}
                    title={post.title}
                    href={post.url}
                />
                <CardContent href={post.url}>
                    {/*<Typography gutterBottom variant="h5" component="h2">
                        Blog
                    </Typography>*/}
                    <Typography variant="body2" color="textSecondary" component="p" align="left">
                        {post.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/*<CardActions>
                    <Button size="small" color="primary" href={post.url}>
                        Conoce más
                    </Button>

                </CardActions>*/}
        </Card>
    );
};

export default withStyles(styles)(ImgMediaCard);
