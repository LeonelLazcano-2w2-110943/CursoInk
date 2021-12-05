import { Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';

export class ReciboCompra extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { compra } = this.props;
        var today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const dia = moment(date).format("DD-MM-YYYY");
        return (
            <Container>
                <Grid container spacing={2} style={{ marginBottom: "3%" }}>
                    <Grid item xs={4} md={4}>
                        <Typography component="h1" variant="h6"><strong>CURSO INK</strong></Typography>
                        <Typography component="h1" variant="h6">Rincon 1660</Typography>
                        <Typography component="h1" variant="h6">Argentina - Córdoba - Córdoba capital</Typography>
                        <Typography component="h1" variant="h6">0351-8167767</Typography>
                        <Typography component="h1" variant="h6">www.curso-ink.com.ar</Typography>
                    </Grid>
                    <Grid item xs={4} md={4}></Grid>
                    <Grid item xs={4} md={4}>
                        <Typography align="center" component="h1" variant="h6"><strong>NOTA DE CRÉDITO</strong></Typography>
                        <Typography align="center" component="h1" variant="h6"><strong>ELECTRÓNICA</strong></Typography>
                        <Typography align="center" component="h1" variant="h6"><strong>RUC-20372360</strong></Typography>
                        <Typography align="center" component="h1" variant="h6"><strong>F001-00004</strong></Typography>
                    </Grid>
                </Grid>
                <Grid>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Articulo</TableCell>
                                    <TableCell align="left">Usuario</TableCell>
                                    <TableCell align="left">Fecha de compra</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">{compra.state.Curso}</TableCell>
                                    <TableCell align="left">{compra.state.UserName}</TableCell>
                                    <TableCell align="left">{dia}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Container >
        );
    }
};
