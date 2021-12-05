import { Avatar, Box, Button, CardMedia, Container, Divider, Grid, IconButton, Modal, Paper, Popover, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import style from '../Tool/Style';
import logo from '../../logo.svg';
import { deleteCurso, obtenerCurso, suscribir } from '../../actions/CursoAction';
import { useParams, withRouter } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../contexto/Store';
import { deleteComentario, edicionComentario, nuevoComentario } from '../../actions/ComentarioAction';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import EmbedVideo from '../Tool/EmbedVideo';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import cardValidator, { number } from 'card-validator';
import { nuevaCompra } from '../../actions/CompraAction';
import ImprimirCompra from './ImprimirCompra';
import ReciboCompra from './ReciboCompra';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}));


export const CursoIndex = (props) => {
    //states
    const classes = useStyles();
    const { id } = useParams();
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [openModal, setOpenModal] = useState(false);
    const [modalCreditCard, setModalCreditCard] = useState(false);
    const handleClose = () => setOpenModal(false);
    const handleCloseCreditCard = () => {
        setCreditCard({
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
        });
        setModalCreditCard(false);
    };
    const [curso, setCurso] = useState({
        titulo: '',
        descripcion: '',
        fechaCreacion: '',
        instructores: '',
        usuarios: [],
        comentarios: [],
        cursoId: id,
        activo: '',
        videoUrl: ''
    });
    const [suscripcion, setSuscripcion] = useState({
        UsuarioId: sesionUsuario.usuario.usuarioId,
        CursoId: curso.cursoId
    });
    const [suscripto, setSuscripto] = useState(false);
    const [comentario, setComentario] = useState({
        Alumno: sesionUsuario.usuario.userName,
        ComentarioTexto: '',
        CursoId: curso.cursoId
    });
    const [comentarioPost, setComentarioPost] = useState({
        ComentarioTexto: '',
        ComentarioId: ''
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [creditCard, setCreditCard] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    const compra = {
        Curso: curso.titulo,
        UserName: sesionUsuario.usuario.userName
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

    //actions

    const realizarCompra = e => {
        e.preventDefault();
        var valid = require("card-validator");
        var numero = valid.number(creditCard.number);
        var fecha = valid.expirationDate(creditCard.expiry);
        var nombre = valid.cardholderName(creditCard.name);
        var codigo = valid.cvv(creditCard.cvc);
        var error = "Errores: ";
        if (!creditCard.number.trim() || !creditCard.expiry.trim() || !creditCard.name.trim() || !creditCard.cvc.trim()) {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: error += "Quedan campos por rellenar"
                }
            });
        }
        if (!numero.isValid) {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: error += " - Número de tarjeta inválido"
                }
            });
        }
        if (!fecha.isValid) {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: error += " - Fecha de tarjeta inválido"
                }
            });
        }
        if (!nombre.isValid) {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: error += " - Nombre de tarjeta inválido"
                }
            });
        }
        if (!codigo.isValid) {
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: error += " - CVC de tarjeta inválido"
                }
            });
        }
        if (numero.isValid && fecha.isValid && nombre.isValid && codigo.isValid) {
            handleCloseCreditCard();
            suscribir(suscripcion).then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: "OPEN_SNACKBAR",
                        openMensaje: {
                            open: true,
                            mensaje: "Curso adquirido con éxito!"
                        }
                    });
                    setSuscripto(true);
                }
            });

            nuevaCompra(compra).then(response => {
                if (response.status === 200) {
                    console.log("compra registrada");
                }
            });

            props.history.push({
                pathname: '/imprimirRecibo',
                state: compra
            })
        }
    }

    const suscribirBoton = e => {
        e.preventDefault();
        setModalCreditCard(true);
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
        setOpenModal(true);
        setComentarioPost({
            ComentarioId: comentarioId,
            ComentarioTexto: comentarioTexto
        });
    }

    const cancelarEdicionBoton = e => {
        e.preventDefault();
        setOpenModal(false);
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

    //inputs

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setComentario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const ingresarValoresMemoriaEdicion = e => {
        const { name, value } = e.target;
        setComentarioPost(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const handleInputFocus = (e) => {
        const { name, value } = e.target;

        setCreditCard(anterior => ({
            ...anterior,
            focus: name
        }));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setCreditCard(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    return (
        <Container>
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos} style={{ paddingBottom: "10px" }}>
                    {curso.titulo}
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
                {sesionUsuario.usuario.userName === curso.instructores.userName ?
                    <div>
                        <Grid container justifyContent="center">
                            <EmbedVideo url={curso.videoUrl} />
                        </Grid>
                        <Grid container justifyContent="center">
                            <Typography component="h1" variant="caption" style={{ color: "gray" }}>
                                creado: {moment(curso.fechaCreacion).format("DD-MM-YYYY")}
                            </Typography>
                        </Grid>
                    </div>
                    :
                    suscripto ?
                        <div>
                            <Grid container justifyContent="center">
                                <EmbedVideo url={curso.videoUrl} />
                            </Grid>
                            <Grid container justifyContent="center">
                                <Typography component="h1" variant="caption" style={{ color: "gray" }}>
                                    creado: {moment(curso.fechaCreacion).format("DD-MM-YYYY")}
                                </Typography>
                            </Grid>
                        </div>
                        :
                        <Grid style={style.noContent}>
                            <Grid container>
                                <Typography component="h1" variant="h4">
                                    Para poder ver el contenido del curso primero debes adquirirlo
                                </Typography>
                            </Grid>
                            <Grid container justifyContent="center">
                                <Button style={style.form} variant="contained" color="primary" onClick={suscribirBoton}>Comprar</Button>
                            </Grid>
                        </Grid>
                }
            </div>
            <p>
                <strong>Descripcion:</strong> {curso.descripcion}
            </p>
            <p>
                <strong>Comentarios:</strong>
            </p>
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
            <div>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style.modal}>
                        <Typography component="h1" variant="h6" style={style.titulos}>Editar comentario</Typography>
                        < TextareaAutosize minRows={3} onChange={ingresarValoresMemoriaEdicion} value={comentarioPost.ComentarioTexto} variant="contained" name="ComentarioTexto" style={style.textArea} label="Ingrese un comentario" />
                        <Grid container spacing={2} style={{ marginTop: "2%" }}>
                            <Grid item xs={12} md={3}>
                                <Button size="small" onClick={cancelarEdicionBoton} color="secondary">Cancelar</Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button size="small" onClick={(e) => { comentarEdicion(e, comentarioPost) }} color="primary">Comentar</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
            <Grid>
                <Modal
                    open={modalCreditCard}
                    onClose={handleCloseCreditCard}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style.modalPayment}>
                        <Grid container spacing={3} style={{ marginBottom: "2%" }}>
                            <Grid xs={12} md={6}>
                                <Cards
                                    cvc={creditCard.cvc}
                                    expiry={creditCard.expiry}
                                    focused={creditCard.focus}
                                    name={creditCard.name}
                                    number={creditCard.number}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <Grid container>
                                    <TextField
                                        name="number"
                                        type="tel"
                                        value={creditCard.number}
                                        onChange={handleInputChange}
                                        variant="standard"
                                        fullWidth
                                        label="Número"
                                        onFocus={handleInputFocus}
                                    />
                                </Grid>
                                <Grid container>
                                    <TextField
                                        name="name"
                                        value={creditCard.name}
                                        onChange={handleInputChange}
                                        variant="standard"
                                        fullWidth
                                        label="Nombre que figura en la tarjeta"
                                        onFocus={handleInputFocus}
                                    />
                                </Grid>
                                <Grid container >
                                    <Grid xs={12} md={8}>
                                        <TextField
                                            name="expiry"
                                            value={creditCard.expiry}
                                            onChange={handleInputChange}
                                            variant="standard"
                                            fullWidth
                                            label="Fecha de expiración"
                                            onFocus={handleInputFocus}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={4}>
                                        <TextField
                                            name="cvc"
                                            value={creditCard.cvc}
                                            onChange={handleInputChange}
                                            variant="standard"
                                            fullWidth
                                            label="cvc"
                                            onFocus={handleInputFocus}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Divider />
                        <br />
                        <Grid container>
                            <Grid xs={12} md={12}>
                                <Typography component="h1" variant="h4" align="center" style={style.titulos}>Estas a punto de comprar...</Typography>
                            </Grid>
                            <Grid xs={12} md={12}>
                                <Typography component="h1" variant="subtitle1" >Curso: {curso.titulo}</Typography>
                            </Grid>
                            <Grid xs={12} md={12}>
                                <Typography component="h1" variant="subtitle1" >Precio: {"$" + curso.precio}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} md={2}>
                                <Button size="small" onClick={handleCloseCreditCard} variant="contained" style={style.form} color="secondary">Cancelar</Button>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Button size="small" onClick={realizarCompra} compra={compra} variant="contained" style={style.form} color="primary">Comprar</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </Grid>
        </Container >
    )
}

export default withRouter(CursoIndex);

