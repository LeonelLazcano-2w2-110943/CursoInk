import { Button, Container, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteRol, listaRoles } from '../../actions/RolAction'
import { useStateValue } from '../../contexto/Store'
import style from '../Tool/Style'

export default function ListaRol() {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        listaRoles().then(response => {
            setRoles(response.data);
        });
    }, [roles])

    const eliminarBoton = (e, id) => {
        e.preventDefault();
        deleteRol(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Rol modificado con éxito"
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
                                <Button fullWidth type="submit" onClick={(e) => { eliminarBoton(e, rol.id) }} variant="text" size="small" color="secondary">
                                    Eliminar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </div >
        </Container >
    )
}
