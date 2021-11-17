import { Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { nuevaComunidad } from '../../actions/ComunidadAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';

export const NuevaComunidad = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [comunidad, setComunidad] = useState({
        Nombre: '',
        Descripcion: '',
        Reglas: '',
        UsuarioCreadorId: ''
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setComunidad(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        nuevaComunidad(comunidad).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Comunidad creada con éxito"
                    }
                });
                props.history.push("/listaComunidades/");
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
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Crea tu propia comunidad!
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="Nombre" value={comunidad.Nombre} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese el nombre de la comunidad" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextareaAutosize minRows={6} name="Descripcion" value={comunidad.Descripcion} onChange={ingresarValoresMemoria} style={style.textArea} placeholder="Ingrese la descripción de la comunidad" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextareaAutosize minRows={6} name="Reglas" value={comunidad.Reglas} onChange={ingresarValoresMemoria} style={style.textArea} placeholder="Ingrese las reglas de la comunidad" />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" onClick={handleSubmit} fullWidth variant="contained" color="primary" size="large" style={style.submit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default withRouter(NuevaComunidad);