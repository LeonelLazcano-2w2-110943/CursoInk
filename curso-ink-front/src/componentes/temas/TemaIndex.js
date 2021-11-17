import { Avatar, Button, Container, Grid, Paper, TextareaAutosize, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import style from '../Tool/Style';
import logo from '../../logo.svg';
import { useParams } from 'react-router';
import moment from 'moment';
import { deleteTema, obtenerTema } from '../../actions/TemaAction';
import { useStateValue } from '../../contexto/Store';
import { Link } from 'react-router-dom';
import { deleteComentario, nuevoComentario } from '../../actions/ComentarioAction';

export default function TemaIndex() {
    const { id } = useParams();
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [tema, setTema] = useState({
        titulo: '',
        descripcion: '',
        fechaCreacion: '',
        activo: false,
        listaComentarios: [],
        usuarioCreador: '',
        comunidad: '',
        temaId: id
    })


    useEffect(() => {
        obtenerTema(id).then(response => {
            setTema(response.data);
        });
    }, [tema])

    const [comentario, setComentario] = useState({
        Alumno: sesionUsuario.usuario.userName,
        ComentarioTexto: '',
        TemaId: tema.temaId
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setComentario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const comentarBoton = e => {
        e.preventDefault();
        nuevoComentario(comentario).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Comentario agregado con éxito"
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

    const eliminarBoton = e => {
        e.preventDefault();
        deleteTema(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Tema actualizado con éxito"
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

    const eliminarComentarioBoton = (e, comentarioId) => {
        e.preventDefault();
        deleteComentario(comentarioId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Comentario modificado con éxito"
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
        <Container>
            <div style={style.tema}>
                <Grid container>
                    <Grid xs={12} md={12}>
                        <Typography component="h1" variant="overline">
                            {tema.comunidad.nombre}
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={11}>
                        <Typography component="h1" variant="h4" style={style.titulos}>
                            {tema.titulo}
                        </Typography>
                    </Grid>
                    {tema.usuarioCreador.userName === sesionUsuario.usuario.userName &&
                        <Grid xs={12} md={1}>
                            <Button component={Link} fullWidth variant="text" size="small" to={"/editarTema/" + id} style={{ color: "#F4CF00" }}>
                                Editar
                            </Button>
                            {tema.activo ?
                                <Button fullWidth type="submit" onClick={eliminarBoton} variant="text" size="small" color="secondary">
                                    Eliminar
                                </Button>
                                :
                                <Button fullWidth type="submit" onClick={eliminarBoton} variant="text" size="small" color="default">
                                    Restaurar
                                </Button>
                            }
                        </Grid>
                    }
                    <Grid container style={{ marginBottom: "5%" }}>
                        <Grid xs={12} md={11} container spacing={2}>
                            <Grid item>
                                <Avatar alt="user Temp" src={logo} />
                            </Grid>
                            <Grid justifyContent="flex-start" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{tema.usuarioCreador.userName}</h4>
                            </Grid>
                        </Grid>
                        <Grid xs={12} md={1} >
                            <Typography component="h1" variant="caption" style={{ color: "gray" }}>
                                {moment(tema.fechaCreacion).format("DD-MM-YYYY")}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={12} style={{ marginBottom: "5%" }}>
                        <Grid>
                            <Typography component="h1" variant="h5">
                                {tema.descripcion}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
            {tema.listaComentarios.map((comentario) =>
                comentario.activo &&
                <Paper style={{ padding: "5px 5px", marginBottom: "3%" }}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            <Avatar alt="user Temp" src={logo} />
                        </Grid>
                        <Grid justifyContent="flex-start" item xs zeroMinWidth>
                            <h4 style={{ margin: 0, textAlign: "left" }}>{comentario.alumno}</h4>
                            <p style={{ textAlign: "left" }}>
                                {comentario.comentarioTexto}
                            </p>
                            <Grid item xs={12} md={11} >
                                <TextareaAutosize minRows={2} onChange={ingresarValoresMemoria} variant="contained" value={comentario.comentarioTexto} name="ComentarioTexto" style={style.textArea} label="Ingrese un comentario" />
                            </Grid>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                Enviado {moment(comentario.fechaCreacion).format("DD-MM-YYYY")}
                            </p>
                            {comentario.alumno === sesionUsuario.usuario.userName &&
                                <Grid container>
                                    <Grid xs={12} md={1}>
                                        <Button size="small" color="primary">Editar</Button>
                                    </Grid>
                                    <Grid xs={12} md={1}>
                                        <Button size="small" color="primary" type="submit" onClick={(e) => { eliminarComentarioBoton(e, comentario.comentarioId) }}>Eliminar</Button>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            )}
            <Paper style={{ padding: "40px 20px", marginBottom: "3%" }}>
                <Grid item xs={12} md={12}>
                    <TextareaAutosize minRows={5} name="ComentarioTexto" onChange={ingresarValoresMemoria} style={style.textArea} placeholder="Escribe un comentario" />
                </Grid>
                <Grid container justifyContent="flex-start">
                    <Grid item xs={12} md={3}>
                        <Button type="submit" onClick={comentarBoton} fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                            Comentar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

        </Container >
    )
}
