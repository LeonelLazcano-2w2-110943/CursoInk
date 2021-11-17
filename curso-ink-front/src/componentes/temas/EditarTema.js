import { Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import { modificarTema, obtenerTema } from '../../actions/TemaAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';

export const EditarTema = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const { id } = useParams();
    const [tema, setTema] = useState({
        titulo: '',
        descripcion: '',
        temaId: id
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setTema(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();

        modificarTema(id, tema).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Tema editado con éxito"
                    }
                });
                props.history.push("/temaIndex/" + tema.temaId);
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
        obtenerTema(id).then(response => {
            setTema(response.data);
        });
    }, [])

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Edita aquí tu tema
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} style={{ display: "none" }}>
                        <TextField name="temaId" value={tema.temaId} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="temaId" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField name="titulo" value={tema.titulo} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Titulo" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextareaAutosize minRows={6} name="descripcion" value={tema.descripcion} onChange={ingresarValoresMemoria} style={style.textArea} label="Descripcion" />
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

export default withRouter(EditarTema);