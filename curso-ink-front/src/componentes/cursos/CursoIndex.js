import { Avatar, Button, CardMedia, Container, Grid, IconButton, Paper, Popover, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import style from '../Tool/Style';
import cursoImagen from '../../standard-img/courseintroimage.jpg';
import logo from '../../logo.svg';
import { deleteCurso, obtenerCurso, suscribir } from '../../actions/CursoAction';
import { useParams, withRouter } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../contexto/Store';
import { deleteComentario, edicionComentario, nuevoComentario } from '../../actions/ComentarioAction';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));


export default function CursoIndex() {
    const classes = useStyles();
    const { id } = useParams();
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [curso, setCurso] = useState({
        titulo: '',
        descripcion: '',
        fechaCreacion: '',
        instructores: [],
        usuarios: [],
        comentarios: [],
        cursoId: id,
        activo: ''
    });
    const [suscripcion, setSuscripcion] = useState({
        UsuarioId: sesionUsuario.usuario.usuarioId,
        CursoId: curso.cursoId
    })

    const [editMode, setEditMode] = useState(false);
    const [suscripto, setSuscripto] = useState(false);

    const suscribirBoton = e => {
        e.preventDefault();
        suscribir(suscripcion).then(response => {
            console.log(response, suscripto);
            if (response.status === 200 && suscripto) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "suscripción modificada con éxito"
                    }
                });
                setSuscripto(false);
            }
            else if (response.status === 200 && !suscripto) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "suscripción modificada con éxito"
                    }
                });
                setSuscripto(true);
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

    useEffect(() => {
        obtenerCurso(id).then(response => {
            setCurso(response.data);
            curso.usuarios.map((usuario) => {
                if (usuario.userName === sesionUsuario.usuario.userName) {
                    setSuscripto(true);
                }
            })
        });
    }, [curso])

    const [comentario, setComentario] = useState({
        Alumno: sesionUsuario.usuario.userName,
        ComentarioTexto: '',
        CursoId: curso.cursoId
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setComentario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const [comentarioPost, setComentarioPost] = useState({
        ComentarioTexto: '',
        ComentarioId: ''
    });
    const ingresarValoresMemoriaEdicion = e => {
        const { name, value } = e.target;
        setComentarioPost(anterior => ({
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
        deleteCurso(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Curso actualizado con éxito"
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

    const editarComentarioBoton = (e, comentarioTexto, comentarioId) => {
        e.preventDefault();
        setEditMode(true);
        setComentarioPost({
            ComentarioId: comentarioId,
            ComentarioTexto: comentarioTexto
        });
    }

    const cancelarEdicionBoton = e => {
        e.preventDefault();
        setEditMode(false);
        setComentarioPost({
            ComentarioId: '',
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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

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
                setEditMode(false);

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

    const open = Boolean(anchorEl);
    return (
        <Container>
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos} style={{ paddingBottom: "10px" }}>
                    {curso.titulo}
                </Typography>
                {suscripto ?
                    <div>
                        <IconButton
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            variant="text"
                            size="small"
                            onClick={suscribirBoton}
                        >
                            <Avatar style={style.avatarNoSub}>
                                <AddIcon style={style.sub} />
                            </Avatar>
                        </IconButton>
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                                paper: classes.paper,
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography>Desuscribirse</Typography>
                        </Popover>
                    </div>
                    :
                    <div>
                        <IconButton
                            aria-owns={open ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            variant="text"
                            size="small"
                            onClick={suscribirBoton}
                        >
                            <Avatar style={style.avatarSub}>
                                <AddIcon style={style.sub} />
                            </Avatar>
                        </IconButton>
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                                paper: classes.paper,
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <Typography>Suscribirse</Typography>
                        </Popover>
                    </div>
                }
                <Typography component="h1" variant="caption" style={{ color: "gray" }}>
                    creado: {moment(curso.fechaCreacion).format("DD-MM-YYYY")}
                </Typography>
                {curso.instructores != null &&
                    curso.instructores.nombreCompleto == sesionUsuario.usuario.nombreCompleto &&
                    <Grid container justifyContent="center" style={{ marginBottom: "1%" }}>
                        <Grid item xs={12} md={1}>
                            <Button component={Link} fullWidth variant="text" size="large" to={"/editarCurso/" + id} style={{ color: "#F4CF00" }}>
                                Editar
                            </Button>
                            {curso.activo ?
                                <Button type="submit" onClick={eliminarBoton} fullWidth variant="text" size="large" color="secondary">
                                    Eliminar
                                </Button>
                                :
                                <Button type="submit" onClick={eliminarBoton} fullWidth variant="text" size="large" color="default">
                                    Restaurar
                                </Button>
                            }
                        </Grid>
                    </Grid>
                }
                <Grid container spacing={0}>
                    <CardMedia variant="outlined"
                        component="img"
                        image={curso.imagenCurso || cursoImagen}
                        title="curso imagen"
                    />
                    <p>
                        Descripcion: {curso.descripcion}
                    </p>
                </Grid>
            </div>
            {curso.comentarios.map((comentario) =>
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
                                    {editMode ? "" : comentario.comentarioTexto}
                                </p>
                            </Grid>
                            <Grid item xs={12} md={11}>
                                {editMode &&
                                    < TextareaAutosize autoFocus minRows={2} onChange={ingresarValoresMemoriaEdicion} value={comentarioPost.ComentarioTexto} variant="contained" name="ComentarioTexto" style={style.textArea} label="Ingrese un comentario" />
                                }
                            </Grid>
                            <Grid style={{ display: "none" }}>
                                <TextField value={comentario.comentarioId} />
                            </Grid>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                Enviado {moment(comentario.fechaCreacion).format("DD-MM-YYYY")}
                            </p>
                            {comentario.alumno === sesionUsuario.usuario.userName &&
                                <Grid container>
                                    {editMode ?
                                        <Grid xs={12} md={1}>
                                            <Button size="small" onClick={cancelarEdicionBoton} color="primary">Cancelar</Button>
                                        </Grid>
                                        :
                                        <Grid xs={12} md={1}>
                                            <Button size="small" color="primary" onClick={(e) => { editarComentarioBoton(e, comentario.comentarioTexto, comentario.comentarioId) }}>Editar</Button>
                                        </Grid>
                                    }
                                    <Grid xs={12} md={1}>
                                        <Button size="small" color="secondary" type="submit" onClick={(e) => { eliminarComentarioBoton(e, comentario.comentarioId) }}>Eliminar</Button>
                                    </Grid>
                                    {editMode &&
                                        <Grid xs={12} md={1}>
                                            <Button size="small" onClick={(e) => { comentarEdicion(e, comentarioPost) }} color="primary">Comentar</Button>
                                        </Grid>
                                    }
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            )}
            <h4>Enviá tu comentario</h4>
            <Paper style={{ padding: "40px 20px", marginBottom: "3%" }}>
                <Grid item xs={12} md={12}>
                    <TextareaAutosize minRows={5} onChange={ingresarValoresMemoria} name="ComentarioTexto" style={style.textArea} label="Ingrese un comentario" />
                </Grid>
                <Grid item xs={12} md={12} style={{ display: "none" }}>
                    <TextField name="cursoId" value={curso.cursoId} variant="standard" fullWidth />
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
