import React, { useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import theme from './theme/theme';
import RegistrarUsuario from './componentes/seguridad/Registrar';
import Login from './componentes/seguridad/Login';
import PerfilUsuario from './componentes/seguridad/PerfilUsuario';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, Snackbar } from '@material-ui/core';
import AppNavBar from './componentes/navegacion/AppNavBar';
import NuevoCurso from './componentes/cursos/NuevoCurso';
import EditarCurso from './componentes/cursos/EditarCurso';
import NuevaComunidad from './componentes/comunidad/NuevaComunidad';
import EditarComunidad from './componentes/comunidad/EditarComunidad';
import NuevoTema from './componentes/temas/NuevoTema';
import EditarTema from './componentes/temas/EditarTema';
import CursoIndex from './componentes/cursos/CursoIndex';
import { useStateValue } from './contexto/Store';
import { obtenerUsuarioActual } from './actions/UsuarioAction';
import TemaIndex from './componentes/temas/TemaIndex';
import ListaComunidades from './componentes/comunidad/ListaComunidades';
import ListaTemas from './componentes/temas/ListaTemas';
import ComunidadIndex from './componentes/comunidad/ComunidadIndex';
import CursoInkIndex from './componentes/CursoInkIndex';
import RutaSegura from './componentes/navegacion/RutaSegura';
import FAQ from './componentes/FAQ';
import RolNuevo from './componentes/seguridad/RolNuevo';
import ListaRol from './componentes/seguridad/ListaRol';
import EditarRol from './componentes/seguridad/EditarRol';
import PaginadorCurso from './componentes/cursos/PaginadorCurso';
import TerminosYCondiciones from './TerminosYCondiciones';
import ImprimirCompra from './componentes/cursos/ImprimirCompra';
import ListaCursosUser from './componentes/cursos/ListaCursosUser';
import ListaComunidadUser from './componentes/comunidad/ListaComunidadUser';
import ListaTemasUser from './componentes/temas/ListaTemasUser';
import ListaComentariosUser from './componentes/comentarios/ListaComentariosUser';
import ListaComprasUser from './componentes/compras/ListaComprasUser';

function App() {
    const [{ openSnackBar }, dispatch] = useStateValue();

    const [iniciaApp, setIniciaApp] = useState(false);

    useEffect(() => {
        if (!iniciaApp) {
            obtenerUsuarioActual(dispatch).then(response => {
                setIniciaApp(true);
            }).catch(error => {
                setIniciaApp(true);
            })
        }
    }, [iniciaApp])
    return iniciaApp === false ? null : (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={openSnackBar ? openSnackBar.open : false}
                autoHideDuration={10000}
                ContentProps={{ "aria-describedby": "message-id" }}
                message={
                    <span id="message-id">{openSnackBar ? openSnackBar.mensaje : ""}</span>
                }
                onClose={() =>
                    dispatch({
                        type: 'OPEN_SNACKBAR',
                        openMensaje: {
                            open: false,
                            mensaje: ""
                        }
                    })
                }
            >

            </Snackbar>
            <Router>
                <MuiThemeProvider theme={theme}>
                    <AppNavBar />
                    <Grid container>
                        <Switch>
                            <RutaSegura exact path="/CursoInkIndex" component={CursoInkIndex} />
                            <Route exact path="/auth/login" component={Login} />
                            <Route exact path="/auth/registrar" component={RegistrarUsuario} />
                            <RutaSegura exact path="/nuevoCurso" component={NuevoCurso} />
                            <RutaSegura exact path="/editarCurso/:id" component={EditarCurso} />
                            <RutaSegura exact path="/cursoIndex/:id" component={CursoIndex} />
                            <RutaSegura exact path="/nuevaComunidad" component={NuevaComunidad} />
                            <RutaSegura exact path="/editarComunidad/:id" component={EditarComunidad} />
                            <RutaSegura exact path="/listaComunidades/" component={ListaComunidades} />
                            <RutaSegura exact path="/comunidadIndex/:id" component={ComunidadIndex} />
                            <RutaSegura exact path="/nuevoTema/:id" component={NuevoTema} />
                            <RutaSegura exact path="/editarTema/:id" component={EditarTema} />
                            <RutaSegura exact path="/listaTemas/" component={ListaTemas} />
                            <RutaSegura exact path="/temaIndex/:id" component={TemaIndex} />
                            <Route exact path="/FAQ" component={FAQ} />
                            <Route exact path="/terminosYCondiciones" component={TerminosYCondiciones} />
                            <RutaSegura exact path="/nuevoRol" component={RolNuevo} />
                            <RutaSegura exact path="/listaRoles" component={ListaRol} />
                            <RutaSegura exact path="/editarRol/:id" component={EditarRol} />
                            <RutaSegura exact path="/imprimirRecibo" component={ImprimirCompra} />
                            <RutaSegura exact path="/misCursos" component={ListaCursosUser} />
                            <RutaSegura exact path="/misComunidades" component={ListaComunidadUser} />
                            <RutaSegura exact path="/misTemas" component={ListaTemasUser} />
                            <RutaSegura exact path="/misComentarios" component={ListaComentariosUser} />
                            <RutaSegura exact path="/misCompras" component={ListaComprasUser} />
                            <RutaSegura
                                exact
                                path="/auth/perfil"
                                component={PerfilUsuario}
                            />
                            <RutaSegura
                                exact
                                path="/"
                                component={CursoInkIndex}
                            />
                            <RutaSegura
                                exact
                                path="/curso/paginador"
                                component={PaginadorCurso}
                            />
                        </Switch>
                    </Grid>
                </MuiThemeProvider>
            </Router>
        </React.Fragment>
    );
}

export default App;
