import { Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import style from '../Tool/Style';
import { listaCursosComprados } from '../../actions/CompraAction';
import { Link } from 'react-router-dom';

export default function CursosAdquiridos() {
    const [cursos, setCursos] = useState([])

    useEffect(() => {
        listaCursosComprados().then(response => {
            setCursos(response.data);
            console.log(response.data);
        });
    }, [])
    return (
        <Container Container component="main" maxWidth="md" justifyContent="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={{ marginBottom: "3%" }, style.titulos}>Mis compras adquiridas</Typography>
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
