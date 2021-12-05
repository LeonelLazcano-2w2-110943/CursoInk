import { Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListaComunidadesPorUsuario } from '../../actions/ComunidadAction';
import style from '../Tool/Style';

export default function ListaTemas() {
    const [comunidades, setComunidades] = useState([])

    useEffect(() => {
        ListaComunidadesPorUsuario().then(response => {
            setComunidades(response.data);
        });
    }, [])
    return (
        <Container Container component="main" maxWidth="md" justifyContent="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={{ marginBottom: "3%" }, style.titulos}>Mis comunidades!</Typography>
                <Grid container spacing={2}>
                    {comunidades.map((comunidad) =>
                        <Grid xs={12} md={12}>
                            <div>
                                <Paper style={{ marginBottom: "3%" }} justifyContent="flex-start">
                                    <ListItem component={Link} button to={"/comunidadindex/" + comunidad.comunidadId}>
                                        <ListItemText primary={comunidad.nombre} />
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