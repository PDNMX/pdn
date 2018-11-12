import {CSVLink, CSVDownload} from "react-csv";
import React from "react";

class PropDataUpdatedCSVLink extends CSVLink {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const {data, headers, separator, uFEFF} = nextProps;
        this.setState({href: this.buildURI(data, uFEFF, headers, separator)});

    }

}

export default PropDataUpdatedCSVLink;