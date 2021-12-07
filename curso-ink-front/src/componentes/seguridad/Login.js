import { Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import style from '../Tool/Style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { loginUsuario } from '../../actions/UsuarioAction';
import { useStateValue } from '../../contexto/Store';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

export const Login = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [usuario, setUsuario] = useState({
        Email: '',
        Password: ''
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const loginUsuarioBoton = e => {
        e.preventDefault();
        loginUsuario(usuario, dispatch).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Login exitoso"
                    }
                });
                window.localStorage.setItem("token_seguridad", response.data.token);
                props.history.push("/");
            }
            else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Las credenciales del usuario son incorrectas'
                    }
                });
            }
        });
    }

    return (
        <Container maxWidth="xs">
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockOutlinedIcon style={style.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login de usuario para CursoInk
                </Typography>
                <form style={style.form}>
                    <TextField variant="standard" value={usuario.Email} onChange={ingresarValoresMemoria} label="Ingrese su email" name="Email" fullWidth margin="normal" />
                    <TextField variant="standard" type="password" value={usuario.Password} onChange={ingresarValoresMemoria} label="Ingrese su contraseña" name="Password" fullWidth margin="normal" />
                    <Button type="submit" onClick={loginUsuarioBoton} fullWidth variant="contained" color="primary" style={style.submit}>
                        Ingresar
                    </Button>
                    <Grid style={{ marginTop: "3%" }}>
                        <Typography component={Link} variant="caption" to="/auth/registrar" style={style.loginLink}>No tienes cuenta en CursoInk? crea una aquí</Typography>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default withRouter(Login);
