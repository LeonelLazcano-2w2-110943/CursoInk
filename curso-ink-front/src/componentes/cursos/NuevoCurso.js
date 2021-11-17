import { Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { nuevoCurso } from '../../actions/CursoAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';
import ImageUploader from 'react-images-upload';
import { v4 as uuidv4 } from 'uuid';
import { obtenerDataImagen } from '../../actions/ImagenAction';

export default function NuevoCurso() {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [imagen, setImagen] = useState(null);

    const [curso, setCurso] = useState({
        Titulo: '',
        Descripcion: '',
        UsuarioCreadorId: sesionUsuario.usuario.usuarioId
    });

    const resetearForm = () => {
        setImagen(null);
        setCurso({
            Titulo: '',
            Descripcion: '',
        });
    }

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setCurso(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    const subirFoto = imagenes => {
        const foto = imagenes[0];

        obtenerDataImagen(foto).then((response) => {
            setImagen(response);
        })
    }

    const fotoKey = uuidv4();

    const crearCurso = e => {
        e.preventDefault();
        const cursoId = uuidv4();
        const objetoCurso = {
            titulo: curso.Titulo,
            descripcion: curso.Descripcion,
            cursoId: cursoId
        }
        let objetoImagen = null;
        if (imagen) {
            objetoImagen = {
                nombre: imagen.nombre,
                data: imagen.data,
                extension: imagen.extension,
                objetoReferencia: cursoId
            }
        }

        nuevoCurso(objetoCurso, objetoImagen).then(response => {
            const responseCurso = response[0];
            const responseImagen = response[1];
            let mensaje = "";
            if (responseCurso.status === 200) {
                mensaje += "Curso creado con éxito";
                resetearForm();
            }
            else {
                mensaje += 'Errores al intentar guardar en: ' + Object.keys(response.data.errors)
            }

            if (responseImagen != null) {
                if (responseImagen.status === 200) {
                    mensaje += " - Imagen agregada con éxito";
                    resetearForm();
                }
                else {
                    mensaje += 'Errores al intentar guardar en: ' + Object.keys(response.data.errors)
                }
            }

            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: mensaje
                }
            });
        });
    }

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Crea tu propio curso!
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="Titulo" value={curso.Titulo} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese el título del curso" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextareaAutosize minRows={6} name="Descripcion" value={curso.Descripcion} onChange={ingresarValoresMemoria} style={style.textArea} placeholder="Ingrese la descripción del curso" />
                        </Grid>
                        <Grid item xs={12} md={12}>
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
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" onClick={crearCurso} fullWidth variant="contained" color="primary" size="large" style={style.submit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}