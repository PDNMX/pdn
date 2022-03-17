import {CSVLink} from "react-csv";


class PropDataUpdatedCSVLink extends CSVLink {

    componentWillReceiveProps(nextProps) {
        const {data, headers, separator, uFEFF} = nextProps;
        this.setState({href: this.buildURI(data, uFEFF, headers, separator)});

    }

}

export default PropDataUpdatedCSVLink;