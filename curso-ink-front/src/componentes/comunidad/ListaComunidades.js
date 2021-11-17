import { Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listaComunidad } from '../../actions/ComunidadAction';
import style from '../Tool/Style';

export default function ListaComunidades() {
    const [comunidades, setComunidades] = useState([])

    useEffect(() => {
        listaComunidad().then(response => {
            setComunidades(response.data);
            console.log(response.data)
        });
    }, [])
    return (
        <Container Container component="main" maxWidth="md" justifyContent="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>Comunidades!</Typography>
                <Grid container spacing={2}>
                    {comunidades.map((comunidad) =>
                        comunidad.activo &&
                        <Grid xs={12} md={12}>
                            <div>
                                <Paper style={{ marginBottom: "3%" }}>
                                    <ListItem component={Link} button to={"/comunidadIndex/" + comunidad.comunidadId}>
                                        <ListItemText primary={comunidad.nombre} secondary={comunidad.descripcion} />
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
