import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, TextareaAutosize } from '@material-ui/core';
import style from '../Tool/Style';
import { registrarUsuario } from '../../actions/UsuarioAction';
import { useStateValue } from '../../contexto/Store';
import { withRouter } from 'react-router';


const RegistrarUsuario = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [usuario, setUsuario] = useState({
        NombreCompleto: '',
        Email: '',
        Password: '',
        ConfirmarPassword: '',
        UserName: '',
        Biografia: ''
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const registrarUsuarioBoton = e => {
        e.preventDefault();
        registrarUsuario(usuario, dispatch).then(response => {
            console.log(response);
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Registro exitoso - Bienvenido a CursoInk"
                    }
                });
                window.localStorage.setItem("token_seguridad", response.data.token);
                props.history.push("/");
            }
            else if (response.status === 500) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Errores al intentar registrar usuario'
                    }
                });
            }
            else if (response.data.errors) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Errores al intentar guardar: ' + Object.values(response.data.errors)
                    }
                });
            }
            else if (response.data.errores) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Errores al intentar guardar: ' + Object.values(response.data.errores)
                    }
                });
            }
        })
    }

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Registro de usuario
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="NombreCompleto" value={usuario.NombreCompleto} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese su nombre y apellido" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Email" value={usuario.Email} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese su email" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="UserName" value={usuario.UserName} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese su user name" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="Password" value={usuario.Password} onChange={ingresarValoresMemoria} type="password" variant="standard" fullWidth label="Ingrese su contraseña" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="ConfirmarPassword" value={usuario.ConfirmarPassword} onChange={ingresarValoresMemoria} type="password" variant="standard" fullWidth label="Confirme su contraseña" />
                        </Grid><Grid item xs={12} md={12}>
                            <TextareaAutosize minRows={6} name="Biografia" value={usuario.Biografia} onChange={ingresarValoresMemoria} style={style.textArea} fullWidth placeholder="Contanos sobre vos" />
                        </Grid>
                    </Grid>
                    <Typography style={{ color: "red" }} variant="caption">*La contraseña debe tener mas de 7 caracteres, tener al menos una letra mayúscula, una minúscula, un número y un caracter especial</Typography>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" onClick={registrarUsuarioBoton} fullWidth variant="contained" color="primary" size="large" style={style.submit}>
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default withRouter(RegistrarUsuario);