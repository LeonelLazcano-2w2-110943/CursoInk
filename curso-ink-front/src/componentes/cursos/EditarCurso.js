import { Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerCurso, modificarCurso } from '../../actions/CursoAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';
import { withRouter } from 'react-router';

export const EditarCurso = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [curso, setCurso] = useState({
        cursoId: '',
        titulo: '',
        descripcion: ''
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setCurso(anterior => ({
            ...anterior,
            [name]: value
        }));
    }
    const { id } = useParams();

    const modificarCursoBoton = e => {
        e.preventDefault();
        modificarCurso(id, curso).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Curso editado con éxito"
                    }
                });
                props.history.push("/curso/paginador");
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
        obtenerCurso(id).then(response => {
            setCurso(response.data);
        });
    }, [])

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Edita aquí tu curso
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} style={{ display: "none" }}>
                        <TextField name="cursoId" value={curso.cursoId} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="cursoId" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField name="titulo" value={curso.titulo} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Titulo" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextareaAutosize minRows={6} name="descripcion" value={curso.descripcion} onChange={ingresarValoresMemoria} style={style.textArea} label="Descripcion" />
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" fullWidth variant="contained" onClick={modificarCursoBoton} size="large" color="primary" style={style.submit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default withRouter(EditarCurso);