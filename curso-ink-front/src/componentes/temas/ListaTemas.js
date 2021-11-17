import { Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../Tool/Style';
import { listaTemas } from '../../actions/TemaAction';

export default function ListaTemas() {
    const [temas, setTemas] = useState([])

    useEffect(() => {
        listaTemas().then(response => {
            setTemas(response.data);
        });
    }, [])
    return (
        <Container Container component="main" maxWidth="md" justifyContent="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={{ marginBottom: "3%" }, style.titulos}>Últimos temas!</Typography>
                <Grid container spacing={2}>
                    {temas.map((tema) =>
                        tema.activo &&
                        <Grid xs={12} md={12}>
                            <div>
                                <Paper style={{ marginBottom: "3%" }} justifyContent="flex-start">
                                    <ListItem component={Link} button to={"/temaIndex/" + tema.temaId}>
                                        <ListItemText primary={tema.titulo} secondary={tema.comunidad.nombre} />
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
