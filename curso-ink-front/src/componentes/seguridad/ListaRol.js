import { Box, Button, Container, Grid, ListItem, ListItemText, Modal, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteRol, listaRoles } from '../../actions/RolAction'
import { useStateValue } from '../../contexto/Store'
import style from '../Tool/Style'

export default function ListaRol() {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [roles, setRoles] = useState([]);
    const [roleId, setRoleId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);

    useEffect(() => {
        listaRoles().then(response => {
            setRoles(response.data);
        });
    }, [roles])

    const eliminarBoton = e => {
        e.preventDefault();
        deleteRol(roleId).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Rol modificado con éxito"
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

    const eliminarBotonModal = (e, rolId) => {
        e.preventDefault();
        setOpenModal(true);
        setRoleId(rolId);
    };

    const cancelarEdicionBoton = e => {
        e.preventDefault();
        setOpenModal(false);
        setRoleId('');
    };

    return (
        <Container component="main" maxWidth="md" justify="flex-start" >
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={{ marginBottom: "3%" }, style.titulos}>Lista de roles</Typography>
                {roles.map((rol) =>
                    <Grid container spacing={2} style={{ marginBottom: "3%" }} >
                        <Grid xs={8} md={8}>
                            <ListItem>
                                <ListItemText primary={rol.name} />
                            </ListItem>
                        </Grid>
                        <Grid xs={4} md={4} container alignItems="center">
                            <Grid xs={6} md={6}>
                                <Button component={Link} fullWidth variant="text" size="small" to={"/editarRol/" + rol.id} style={{ color: "#F4CF00" }}>
                                    Editar
                                </Button>
                            </Grid>
                            <Grid xs={6} md={6}>
                                <Button fullWidth type="submit" onClick={(e) => { eliminarBotonModal(e, rol.id) }} variant="text" size="small" color="secondary">
                                    Eliminar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </div >
            <div>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style.modal}>
                        <Typography component="h1" variant="h6" style={style.titulos}>Está seguro que desea eliminar este rol?</Typography>
                        <Grid container spacing={2} style={{ marginTop: "2%" }}>
                            <Grid item xs={12} md={3}>
                                <Button size="small" onClick={cancelarEdicionBoton} color="primary">Cancelar</Button>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Button size="small" onClick={eliminarBoton} color="secondary">Eliminar</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        </Container >
    )
}
