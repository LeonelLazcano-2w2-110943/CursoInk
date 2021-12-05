import { Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router';
import { modificarComunidad, obtenerComunidad } from '../../actions/ComunidadAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';

export const EditarComunidad = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [comunidad, setComunidad] = useState({
        comunidadId: '',
        nombre: '',
        reglas: '',
        descripcion: ''
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setComunidad(anterior => ({
            ...anterior,
            [name]: value
        }));
    }
    const { id } = useParams();

    const handleSubmit = e => {
        e.preventDefault();

        modificarComunidad(id, comunidad).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Comunidad editada con éxito"
                    }
                });
                props.history.push("/comunidadIndex/" + id);
            }
            else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Errores al intentar guardar: ' + Object.values(response.data.errors)
                    }
                });
            }
        });
    }

    useEffect(() => {
        obtenerComunidad(id).then(response => {
            setComunidad(response.data);
        });
    }, [])

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Edita aquí tu comunidad!
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} style={{ display: "none" }}>
                        <TextField name="comunidadId" value={comunidad.comunidadId} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="cursoId" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField name="nombre" value={comunidad.nombre} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Nombre" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextareaAutosize minRows={6} name="descripcion" value={comunidad.descripcion} onChange={ingresarValoresMemoria} style={style.textArea} label="Descripcion" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextareaAutosize minRows={6} name="reglas" value={comunidad.reglas} onChange={ingresarValoresMemoria} style={style.textArea} label="Reglas" />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" fullWidth variant="contained" onClick={handleSubmit} size="large" color="primary" style={style.submit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}
export default withRouter(EditarComunidad);