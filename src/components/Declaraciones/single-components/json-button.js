import React, { Component } from "react";
import { Button } from "@material-ui/core";
import CloudDownload from "@material-ui/icons/CloudDownload";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  pdn_miu_icon: {
    marginLeft: 5
  },
  pdn_link_todownload: {
    background: "#ffe01b",
    color: "#313233",
    margin: "20px auto"
  }
});

class JSONButton extends Component {
  render() {
    let obj = this.props.profile,
      str = `text/json;charset=utf-8, ${encodeURIComponent(
        JSON.stringify(obj)
      )}`;
    let { classes } = this.props;

    return (
      <Button
        href={"data: " + str}
        download
        color="primary"
        variant="contained"
        className={classes.pdn_link_todownload}
      >
        {this.props.text} <CloudDownload className={classes.pdn_miu_icon} />
      </Button>
    );
  }
}

export default withStyles(styles)(JSONButton);
