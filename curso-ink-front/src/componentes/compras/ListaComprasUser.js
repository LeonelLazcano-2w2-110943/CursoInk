import { Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import style from '../Tool/Style';
import { listaComprasPorUsuario } from '../../actions/CompraAction';
import moment from 'moment';

export default function ListaTemas() {
    const [compras, setCompras] = useState([])

    useEffect(() => {
        listaComprasPorUsuario().then(response => {
            setCompras(response.data);
        });
    }, [])
    return (
        <Container Container component="main" maxWidth="md" justifyContent="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={{ marginBottom: "3%" }, style.titulos}>Mis Compras!</Typography>
                <Grid container spacing={2}>
                    {compras.map((compra) =>
                        <Grid xs={12} md={12}>
                            <div>
                                <Paper style={{ marginBottom: "3%" }} justifyContent="flex-start">
                                    <ListItem>
                                        <ListItemText primary={compra.curso} secondary={"Fecha de compra: " + moment(compra.fechaCompra).format("DD-MM-YYYY")} />
                                    </ListItem>
                                </Paper>
                            </div>
                        </Grid>
                    )}
                </Grid>

            </div >
        </Container >
    )
}