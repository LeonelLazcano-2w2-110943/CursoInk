import { Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listaCursosPorUsuario } from '../../actions/CursoAction';
import style from '../Tool/Style';

export default function ListaTemas() {
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        listaCursosPorUsuario().then(response => {
            setCursos(response.data);
        });
    }, [])
    return (
        <Container Container component="main" maxWidth="md" justifyContent="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={{ marginBottom: "3%" }, style.titulos}>Mis cursos!</Typography>
                <Grid container spacing={2}>
                    {cursos.map((curso) =>
                        <Grid xs={12} md={12}>
                            <div>
                                <Paper style={{ marginBottom: "3%" }} justifyContent="flex-start">
                                    <ListItem component={Link} button to={"/cursoIndex/" + curso.cursoId}>
                                        <ListItemText primary={curso.titulo} />
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