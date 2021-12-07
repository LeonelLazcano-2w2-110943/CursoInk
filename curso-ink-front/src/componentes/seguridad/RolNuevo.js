import { Button, Container, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { withRouter } from 'react-router';
import { nuevoRol } from '../../actions/RolAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';

export const RolNuevo = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [rol, setRol] = useState({
        Nombre: ''
    })

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setRol(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const crearRol = e => {
        e.preventDefault();
        nuevoRol(rol).then(response => {
            if (response.status == 403) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Usted no tiene permisos de administrador para crear roles"
                    }
                });
            }
            else if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Rol creado con éxito"
                    }
                });
                props.history.push("/listaRoles");
            }
            else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Errores al intentar guardar: ' + Object.keys(response.data.errors)
                    }
                });
            }
        });
    }
    return (
        <Container>
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Nuevo rol
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2} justify="center">
                        <Grid item xs={12} md={6}>
                            <TextField name="Nombre" value={rol.Nombre} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese el nombre del rol" />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" onClick={crearRol} fullWidth variant="contained" color="primary" size="large" style={style.submit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default withRouter(RolNuevo);