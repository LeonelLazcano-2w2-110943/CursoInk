import { Avatar, Box, Button, Container, Grid, Modal, Paper, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import style from '../Tool/Style';
import logo from '../../logo.svg';
import { useParams } from 'react-router';
import moment from 'moment';
import { deleteTema, obtenerTema } from '../../actions/TemaAction';
import { useStateValue } from '../../contexto/Store';
import { Link } from 'react-router-dom';
import { deleteComentario, edicionComentario, nuevoComentario } from '../../actions/ComentarioAction';

export default function TemaIndex() {
    const { id } = useParams();
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [editMode, setEditMode] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);

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

    const [temaPost, setTemaPost] = useState({
        ComentarioTexto: '',
        TemaId: ''
    });

    const ingresarValoresMemoriaEdicion = e => {
        const { name, value } = e.target;
        setTemaPost(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const editarComentarioBoton = (e, comentarioTexto, temaId) => {
        e.preventDefault();
        setEditMode(true);
        setOpenModal(true);
        setTemaPost({
            TemaId: temaId,
            ComentarioTexto: comentarioTexto
        });
    }

    const cancelarEdicionBoton = e => {
        e.preventDefault();
        setEditMode(false);
        setOpenModal(false);
        setTemaPost({
            TemaId: '',
            ComentarioTexto: ''
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

    const comentarEdicion = (e, comentario) => {
        e.preventDefault();
        edicionComentario(comentario).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Comentario modificado con éxito"
                    }
                });
                setOpenModal(false);
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
                        <Typography component={Link} to={"/comunidadIndex/" + tema.comunidad.comunidadId} style={style.loginLink} variant="overline">
                            {"<--" + tema.comunidad.nombre}
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
                            <Grid>
                                <p style={{ textAlign: "left" }}>
                                    {comentario.comentarioTexto}
                                </p>
                            </Grid>
                            <Grid style={{ display: "none" }}>
                                <TextField value={comentario.comentarioId} />
                            </Grid>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                Enviado {moment(comentario.fechaCreacion).format("DD-MM-YYYY")}
                            </p>
                            {comentario.alumno === sesionUsuario.usuario.userName &&
                                <Grid container>
                                    <Grid xs={12} md={1}>
                                        <Button size="small" color="primary" onClick={(e) => { editarComentarioBoton(e, comentario.comentarioTexto, comentario.comentarioId) }}>Editar</Button>
                                    </Grid>
                                    <Grid xs={12} md={1}>
                                        <Button size="small" color="secondary" type="submit" onClick={(e) => { eliminarComentarioBoton(e, comentario.comentarioId) }}>Eliminar</Button>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            )}
            <h4>Enviá tu comentario</h4>
            <Paper style={{ padding: "40px 20px", marginBottom: "3%" }}>
                <Grid item xs={12} md={12}>
                    <TextareaAutosize minRows={5} name="ComentarioTexto" onChange={ingresarValoresMemoria} style={style.textArea} placeholder="Escribe un comentario" />
                </Grid>
                <Grid item xs={12} md={12} style={{ display: "none" }}>
                    <TextField name="cursoId" value={tema.temaId} variant="standard" fullWidth />
                </Grid>
                <Grid container justifyContent="flex-start">
                    <Grid item xs={12} md={3}>
                        <Button type="submit" onClick={comentarBoton} fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                            Comentar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <div>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style.modal}>
                        <Typography component="h1" variant="h6" style={style.titulos}>Editar comentario</Typography>
                        < TextareaAutosize minRows={3} onChange={ingresarValoresMemoriaEdicion} value={temaPost.ComentarioTexto} variant="contained" name="ComentarioTexto" style={style.textArea} label="Ingrese un comentario" />
                        <Grid container spacing={2} style={{ marginTop: "2%" }}>
                            <Grid item xs={12} md={3}>
                                <Button size="small" onClick={cancelarEdicionBoton} color="secondary">Cancelar</Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button size="small" onClick={(e) => { comentarEdicion(e, temaPost) }} color="primary">Comentar</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </Container >
    )
}
