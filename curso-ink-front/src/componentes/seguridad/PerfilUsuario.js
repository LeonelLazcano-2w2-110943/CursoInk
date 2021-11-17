import { Avatar, Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { actualizarUsuario, obtenerUsuarioActual } from '../../actions/UsuarioAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';
import reactFoto from '../../logo.svg';
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from 'react-images-upload';
import { obtenerDataImagen } from '../../actions/ImagenAction';

export default function PerfilUsuario() {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [usuario, setUsuario] = useState({
        nombreCompleto: '',
        email: '',
        password: '',
        ConfirmarPassword: '',
        biografia: '',
        userName: '',
        imagenPerfil: null,
        fotoUrl: ''
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario, dispatch).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Usuario actualizado con éxito"
                    }
                });
                window.localStorage.setItem("token_seguridad", response.data.token);
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
        setUsuario(sesionUsuario.usuario);
        setUsuario(anterior => ({
            ...anterior,
            fotoUrl: sesionUsuario.usuario.imagenPerfil,
            imagenPerfil: null
        }));
    }, [])

    const fotoKey = uuidv4();

    const subirFoto = imagenes => {
        const foto = imagenes[0];
        const fotoUrl = URL.createObjectURL(foto);

        obtenerDataImagen(foto).then(respuesta => {
            setUsuario(anterior => ({
                ...anterior,
                imagenPerfil: respuesta,
                fotoUrl: fotoUrl
            }));
        });
    }

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto}></Avatar>
                <Typography component="h1" variant="h5">
                    Perfil de usuario
                </Typography>

                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="nombreCompleto" value={usuario.nombreCompleto} onChange={ingresarValoresMemoria} varian="standard" fullWidth label="Ingrese nombre y apellido" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="email" value={usuario.email} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese email" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="userName" value={usuario.userName} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese su nombre de usuario" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="password" value={usuario.password} onChange={ingresarValoresMemoria} type="password" variant="standard" fullWidth label="Ingrese contraseña" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="ConfirmarPassword" value={usuario.ConfirmarPassword} onChange={ingresarValoresMemoria} type="password" variant="standard" fullWidth label="Confirme su contraseña" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ImageUploader
                                withIcon={false}
                                key={fotoKey}
                                singleImage={true}
                                buttonText="Seleccione una imagen de perfil"
                                onChange={subirFoto}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextareaAutosize minRows={6} name="biografia" value={usuario.biografia} onChange={ingresarValoresMemoria} style={style.textArea} label="Ingrese su biografía" />
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <Button type="submit" fullWidth variant="contained" onClick={guardarUsuario} size="large" color="primary" style={style.submit}>
                                    Guardar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
