import React, {Component} from "react";
import {Button} from '@material-ui/core';
import CloudDownload from '@material-ui/icons/CloudDownload';
class JSONButton extends Component{
	render(){
		let obj = this.props.profile,
		    str = `text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(obj))}`;

		return(
			<Button href={'data: ' + str} download color="primary" variant="contained" className="pdn_link_todownload">
				{this.props.text}  <CloudDownload  className="pdn_miu_icon"/>
			</Button>
		);
	}
}

export default JSONButton;
