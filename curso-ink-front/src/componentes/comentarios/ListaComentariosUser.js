import { Button, Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteComentario, listaComentarios } from '../../actions/ComentarioAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';

export default function ListaComentariosUser() {
    const [comentarios, setComentarios] = useState([]);
    const [{ sesionUsuario }, dispatch] = useStateValue();

    useEffect(() => {
        listaComentarios().then(response => {
            setComentarios(response.data);
            console.log(response.data);
        });
    }, [comentarios])

    const eliminarComentarioBoton = (e, comentarioId) => {
        e.preventDefault();
        deleteComentario(comentarioId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Comentario restaurado con éxito"
                    }
                });
            }
            else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Errores al intentar guardar en: ' + Object.keys(response.data.errors)
                    }
                });
            }
        });
    }

    return (
        <Container Container component="main" maxWidth="md" justifyContent="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={{ marginBottom: "3%" }, style.titulos}>Mis comentarios</Typography>
                <Grid container spacing={2}>
                    {comentarios.map((comentario) =>
                        comentario.curso ?
                            <Grid xs={12} md={12}>
                                <div>
                                    <Paper style={{ marginBottom: "3%" }} justifyContent="flex-start">
                                        <ListItem component={Link} button to={"/cursoIndex/" + comentario.curso.cursoId}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={10} md={10}>
                                                    <ListItemText primary={comentario.comentarioTexto} secondary={comentario.curso.titulo} />
                                                    {
                                                        !comentario.activo &&
                                                        <Typography variant="caption" style={{ color: "red" }}>Comentario Inactivo</Typography>
                                                    }
                                                </Grid>
                                                <Grid item xs={2} md={2}>
                                                    {
                                                        !comentario.activo &&
                                                        <Button onClick={(e) => { eliminarComentarioBoton(e, comentario.comentarioId) }} fullWidth type="submit" variant="contained" size="small" color="default">
                                                            Restaurar
                                                        </Button>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </Paper>
                                </div>
                            </Grid>
                            :
                            <Grid xs={12} md={12}>
                                <div>
                                    <Paper style={{ marginBottom: "3%" }} ju stifyContent="flex-start">
                                        <ListItem component={Link} button to={"/temaIndex/" + comentario.tema.temaId}>
                                            <Grid container alignItems="center">
                                                <Grid item xs={10} md={10}>
                                                    <ListItemText primary={comentario.comentarioTexto} secondary={comentario.tema.titulo} />
                                                    {
                                                        !comentario.activo &&
                                                        <Typography variant="caption" style={{ color: "red" }}>Comentario Inactivo</Typography>
                                                    }
                                                </Grid>
                                                <Grid item xs={2} md={2}>
                                                    {
                                                        !comentario.activo &&
                                                        <Button onClick={(e) => { eliminarComentarioBoton(e, comentario.comentarioId) }} fullWidth type="submit" variant="contained" size="small" color="default">
                                                            Restaurar
                                                        </Button>
                                                    }
                                                </Grid>
                                            </Grid>
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
