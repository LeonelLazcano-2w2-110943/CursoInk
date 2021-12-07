import { Avatar, Button, Card, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography, Box, Link as Linky } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import banner from '../standard-img/index.jpg';
import style from './Tool/Style';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { getReporte } from '../actions/ReporteAction';
import reactFoto from '../logo.svg';

export default function CursoInkIndex() {
    const [reporte, setReporte] = useState({
        usuariosMasActivos: [],
        usuariosRelevantes: [],
        cursosRelevantes: [],
        comunidadesMasRelevantes: [],
        resumenGeneral: '',
        fotoUMA: '',
        fotoUR: '',
        fotoCR: ''
    })

    useEffect(() => {
        getReporte().then(response => {
            setReporte(response.data);
            console.log(response.data);
        });
    }, [])

    return (
        <React.Fragment>
            <Container>
                <div>
                    <div style={{ marginTop: "3%", position: "relative" }}>
                        <img src={banner} alt="test" style={style.img} />
                    </div>
                    <div style={{
                        position: 'absolute',
                        color: 'black',
                        top: 180,
                        left: '35%',
                        transform: 'translateX(-50%)'
                    }}>
                        <Typography component="h1" variant="h4">Comparte, aprende e intercambia ideas </Typography>
                        <Typography component="h1" variant="h4">en CursoInk </Typography>
                    </div>
                </div>
                <Grid container spacing={1} style={{ marginTop: "3%", marginBottom: "3%" }}>
                    <Grid item xs={4} md={3}>
                        <Box border={2} borderColor="#5BEE01">
                            <Typography style={{ color: "#5BEE01" }} align="center" component="h1" variant="h6">{reporte.resumenGeneral.cantidadUsuarios}</Typography>
                            <Typography style={{ color: "#5BEE01" }} align="center" component="h1" variant="h6">Usuarios</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Linky href="/curso/paginador" style={style.cardLink}>
                            <Box border={2} borderColor="primary.main">
                                <Typography color="primary" align="center" component="h1" variant="h6">{reporte.resumenGeneral.cantidadCursos}</Typography>
                                <Typography color="primary" align="center" component="h1" variant="h6">Cursos</Typography>
                            </Box>
                        </Linky>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Linky href="/listaComunidades/" style={style.cardLink}>
                            <Box border={2} borderColor="#EE9F4A">
                                <Typography style={{ color: "#EE9F4A" }} align="center" component="h1" variant="h6">{reporte.resumenGeneral.cantidadComunidades}</Typography>
                                <Typography style={{ color: "#EE9F4A" }} align="center" component="h1" variant="h6">Comunidades</Typography>
                            </Box>
                        </Linky>
                    </Grid>
                    <Grid item xs={4} md={3}>
                        <Linky href="/listaTemas/" style={style.cardLink}>
                            <Box border={2} borderColor="#00E5AA">
                                <Typography style={{ color: "#00E5AA" }} align="center" component="h1" variant="h6">{reporte.resumenGeneral.cantidadTemas}</Typography>
                                <Typography style={{ color: "#00E5AA" }} align="center" component="h1" variant="h6">Temas</Typography>
                            </Box>
                        </Linky>
                    </Grid>
                </Grid>
                {reporte.cursosRelevantes != null &&
                    <div>
                        <Typography component="h1" variant="h4" style={style.titulos}>Nuestros cursos mas relevantes</Typography>
                        <Carousel navButtonsAlwaysVisible>
                            {reporte.cursosRelevantes.map((curso) =>
                                <Grid xs={12} md={12} component={Link} to={"/cursoIndex/" + curso.cursoId} style={style.cardLink}>
                                    <Grid container>
                                        <Grid xs={4} md={4}>
                                            <CardMedia
                                                component="img"
                                                image={curso.imagenCursosRelevantes || reactFoto}
                                                alt="curso imagen"
                                                height="194"
                                            />
                                        </Grid>
                                        <Grid xs={8} md={7} style={{ marginLeft: "2%" }}>
                                            <Typography component="h3" variant="h3">{curso.titulo}</Typography>
                                            <Typography component="h6" variant="h6">
                                                {curso.descripcion.length > 200 &&
                                                    curso.descripcion.substring(0, 200)
                                                }...</Typography>
                                            <p>Comentarios: {curso.cantidadComentarios}</p>
                                            <p>Suscriptores totales: {curso.cantidadSuscriptores}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Carousel>
                    </div>
                }
                {reporte.comunidadesMasRelevantes != null &&
                    <div>
                        <Typography component="h1" variant="h4" style={style.titulos}>Comunidades mas activas</Typography>
                        <Grid style={{ textAlign: "center" }}>
                            <Carousel navButtonsAlwaysVisible>
                                {reporte.comunidadesMasRelevantes.map((comunidad) =>
                                    <Grid xs={12} md={12} component={Link} to={"/comunidadIndex/" + comunidad.comunidadId} style={style.cardLink}>
                                        <Typography component="h3" variant="h3">{comunidad.titulo}</Typography>
                                        <Typography component="h6" variant="h6">{comunidad.descripcion}</Typography>
                                        <p>Temas totales: {comunidad.cantidadTemas}</p>
                                    </Grid>
                                )}
                            </Carousel>
                        </Grid>
                    </div>
                }
                {
                    reporte.usuariosRelevantes != null &&
                    <div>
                        <Typography component="h1" variant="h4" style={style.titulos}>Usuarios Top</Typography>
                        <Carousel navButtonsAlwaysVisible>
                            {reporte.usuariosRelevantes.map((usuario) =>
                                <Grid xs={12} md={12}>
                                    <Grid container>
                                        <Grid xs={4} md={4}>
                                            <CardMedia
                                                component="img"
                                                image={usuario.imagenUsuariosRelevantes || reactFoto}
                                                alt="usuario imagen"
                                                height="194"
                                            />
                                        </Grid>
                                        <Grid xs={8} md={7} style={{ marginLeft: "2%" }}>
                                            <Typography component="h3" variant="h3">{usuario.userName}</Typography>
                                            <Typography component="h6" variant="h6">{usuario.descripcion}</Typography>
                                            <p>Cursos creados: {usuario.cantidadCursos}</p>
                                            <p>Suscripciones a sus cursos: {usuario.cantidadSuscriptos}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Carousel>
                    </div>
                }
                {
                    reporte.usuariosMasActivos != null &&
                    <div>
                        <Typography component="h1" variant="h4" style={style.titulos}>Usuarios creadores</Typography>
                        <Carousel navButtonsAlwaysVisible>
                            {reporte.usuariosMasActivos.map((usuario) =>
                                <Grid xs={12} md={12}>
                                    <Grid container>
                                        <Grid xs={4} md={4} >
                                            <CardMedia
                                                component="img"
                                                image={usuario.imagenUsuariosMasActivos || reactFoto}
                                                alt="usuario imagen"
                                                height="194"
                                            />
                                        </Grid>
                                        <Grid xs={8} md={7} style={{ marginLeft: "2%" }}>
                                            <Typography component="h3" variant="h3">{usuario.userName}</Typography>
                                            <Typography component="h6" variant="h6">{usuario.descripcion}</Typography>
                                            <p>Cursos creados: {usuario.cantidadCursos}</p>
                                            <p>Comunidades creadas: {usuario.cantidadComunidades}</p>
                                            <p>Temas creados: {usuario.cantidadTemas}</p>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Carousel>
                    </div>
                }
            </Container >
            <Footer />
        </React.Fragment >
    )
}

const Footer = () => {
    return (
        <Grid style={{ marginTop: "5%", width: "100%" }}>
            <Box bgcolor="#6100AE" style={{ color: "white", padding: "20px 0px" }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Box borderBottom={1}>Contáctanos</Box>
                        <Box>
                            <Typography href="">soporteCursoInk@soporte.com.ar</Typography>
                            <Typography href="">staffCursoInk@staff.com.ar</Typography>
                            <Typography href="">denunciasCursoInk@denuncias.com.ar</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box borderBottom={1}>Ayuda</Box>
                        <Box >
                            <Link style={style.link} underline="none" to="/FAQ">Preguntas frecuentes</Link>
                        </Box>
                        <Box>
                            <Link style={style.link} underline="none" to="/terminosYCondiciones">Términos y condiciones</Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

