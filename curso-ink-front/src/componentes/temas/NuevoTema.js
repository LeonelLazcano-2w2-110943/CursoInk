import { Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router';
import { obtenerComunidad } from '../../actions/ComunidadAction';
import { nuevoTema } from '../../actions/TemaAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style'

export const NuevoTema = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const { id } = useParams();
    const [tema, setTema] = useState({
        Titulo: '',
        Descripcion: '',
        ComunidadId: id
    });
    const [comunidad, setComunidad] = useState({
        nombre: ''
    })

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setTema(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    useEffect(() => {
        obtenerComunidad(id).then(response => {
            setComunidad(response.data);
            console.log(response.data);
        })
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        nuevoTema(id, tema).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Tema creado con éxito"
                    }
                });
                props.history.push("/comunidadIndex/" + comunidad.comunidadId);
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

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Crea tu propio tema en "{comunidad.nombre}"!
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="Titulo" value={tema.Titulo} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese el titulo del tema" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextareaAutosize minRows={6} name="Descripcion" value={tema.Descripcion} onChange={ingresarValoresMemoria} style={style.textArea} placeholder="Ingrese la descripción del tema" />

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

export default withRouter(NuevoTema);
