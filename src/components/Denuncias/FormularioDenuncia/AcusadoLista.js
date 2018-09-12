import React from 'react'
import PropTypes from 'prop-types'
import Acusado from './Acusado'
import Grid from "@material-ui/core/Grid/Grid";
import Card from "../../SimpleCard";
import Typography from "@material-ui/core/Typography/Typography";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";

class AcusadoLista extends React.Component {

    state = {
        acusados: []
    };

    render() {
        const {acusados} = this.props;

        return (
            <div>
                {acusados.length > 0 &&
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {acusados.map(acusado =>
                            <Acusado key={acusado.id} {...acusado}/>)}
                    </TableBody>

                </Table>
                }
            </div>

        );

    }
}

export default AcusadoLista;