import { Button, CardMedia, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerCurso, modificarCurso } from '../../actions/CursoAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';
import { withRouter } from 'react-router';
import { obtenerDataImagen } from '../../actions/ImagenAction';
import ImageUploader from 'react-images-upload';
import { v4 as uuidv4 } from 'uuid';
import CursoImagen from '../../standard-img/courseintroimage.jpg';

export const EditarCurso = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [imagen, setImagen] = useState('');

    const [curso, setCurso] = useState({
        cursoId: '',
        titulo: '',
        descripcion: '',
        videoUrl: '',
        imagenCurso: '',
        fotoUrl: ''
    });

    const subirFoto = imagenes => {
        const foto = imagenes[0];
        const fotoUrl = URL.createObjectURL(foto);

        obtenerDataImagen(foto).then((response) => {
            setCurso(anterior => ({
                ...anterior,
                imagenCurso: response,
                fotoUrl: fotoUrl
            }));
        })
    }

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
                props.history.push("/cursoIndex/" + curso.cursoId);
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
        obtenerCurso(id).then(response => {
            setCurso(response.data);
            setCurso(anterior => ({
                ...anterior,
                fotoUrl: response.data.imagenCurso,
                imagenCurso: null
            }));
        });
    }, [])

    const fotoKey = uuidv4();

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
                        <TextField name="precio" type="number" value={curso.precio} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Precio" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextField name="videoUrl" value={curso.videoUrl} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="url del video" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <TextareaAutosize minRows={3} name="descripcion" value={curso.descripcion} onChange={ingresarValoresMemoria} style={style.textArea} label="Descripcion" />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={12}>
                            <CardMedia
                                component="img"
                                height="194"
                                image={curso.fotoUrl || CursoImagen}
                                alt="Imagen de curso"
                            />
                        </Grid>
                        <Grid xs={12} md={12}>
                            <ImageUploader
                                withIcon={false}
                                key={fotoKey}
                                singleImage={true}
                                buttonText="Seleccione una imagen"
                                onChange={subirFoto}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginBottom: "3%" }}>
                        <Grid item xs={12} md={12}>
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