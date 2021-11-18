import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
