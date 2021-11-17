import { Button, Card, CardContent, Container, Divider, Grid, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../Tool/Style';
import { useParams } from 'react-router';
import { deleteComunidad, obtenerComunidad } from '../../actions/ComunidadAction';
import { useStateValue } from '../../contexto/Store';


export default function ComunidadIndex() {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [comunidad, setComunidad] = useState({
        nombre: '',
        descripcion: '',
        reglas: '',
        fechaCreacion: '',
        usuarioCreador: '',
        listaTemas: [],
        activo: '',
        comunidadId: ''
    });

    const { id } = useParams();
    useEffect(() => {
        obtenerComunidad(id).then(response => {
            setComunidad(response.data);
        });
    }, [comunidad])

    const eliminarComunidadBoton = e => {
        e.preventDefault();
        deleteComunidad(id).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Comunidad actualizada con éxito"
                    }
                });
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
        <Container component="main" maxWidth="md"  >
            <div style={style.tema}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography component="h1" variant="h4" style={style.titulos}>{comunidad.nombre}</Typography>
                                <br />
                                <Divider />
                                <br />
                                {comunidad.listaTemas.map((tema) =>
                                    tema.activo &&
                                    <div>
                                        <Paper style={{ marginBottom: "3%" }}>
                                            <ListItem component={Link} button to={"/temaIndex/" + tema.temaId}>
                                                <ListItemText primary={tema.titulo} secondary={tema.usuarioCreador.userName} />
                                            </ListItem>
                                        </Paper>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" variant="caption" gutterBottom>
                                    Detalle de la comunidad
                                </Typography>
                                <Divider />
                                <Typography variant="subtitle2" component="h2">
                                    {comunidad.descripcion}
                                </Typography>
                                <Typography color="textSecondary" variant="caption" gutterBottom>
                                    Reglas de la comunidad
                                </Typography>
                                <Divider />
                                <Typography variant="subtitle2" component="h2">
                                    {comunidad.reglas}
                                </Typography>
                                <Typography color="textSecondary" variant="caption" gutterBottom>
                                    Administrador
                                </Typography>
                                <Divider />
                                <Typography variant="subtitle2" component="h2">
                                    {comunidad.usuarioCreador.userName}
                                </Typography>
                                <Button component={Link} to={"/nuevoTema/" + id} fullWidth variant="outlined" size="small" color="primary" style={style.submit}>Nuevo tema</Button>
                                {comunidad.usuarioCreador.userName === sesionUsuario.usuario.userName &&
                                    <div>
                                        {comunidad.activo ?
                                            <Button type="submit" onClick={eliminarComunidadBoton} fullWidth variant="outlined" size="small" color="secondary" style={style.submit}>Baja comunidad</Button>
                                            :
                                            <Button type="submit" onClick={eliminarComunidadBoton} fullWidth variant="outlined" size="small" color="default" style={style.submit}>Alta comunidad</Button>
                                        }
                                        <Button size="small" component={Link} to={"/editarComunidad/" + id} fullWidth variant="outlined" color="default" style={style.submit}>Editar comunidad</Button>
                                    </div>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div >
        </Container >
    )
}
