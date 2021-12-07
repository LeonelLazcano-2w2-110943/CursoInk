import { Avatar, Button, Drawer, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { useStateValue } from '../../../contexto/Store';
import fotoUsuarioTemp from '../../../standard-img/user.jpg';
import { MenuIzquierda } from './MenuIzquierda';
import { Link, withRouter } from 'react-router-dom';
import { MenuDerecha } from './MenuDerecha';

const useStyles = makeStyles((theme) => ({
    seccionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    seccionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    grow: {
        flexGrow: 1
    },
    avatarSize: {
        width: 40,
        height: 40
    },
    list: {
        width: 250
    },
    listItemText: {
        fontSize: "14px",
        fontWeight: 600,
        paddingLeft: "15",
        color: "#212121"
    }
}));

const BarSesion = (props) => {
    const clases = useStyles();
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [abrirIzquierda, setAbrirIzquierda] = useState(false);
    const [abrirDerecha, setAbrirDerecha] = useState(false);
    const cerrarMenuIzquierda = () => {
        setAbrirIzquierda(false);
    }
    const abrirMenuIzquierdaAction = () => {
        setAbrirIzquierda(true);
    }
    const cerrarMenuDerecha = () => {
        setAbrirDerecha(false);
    }
    const abrirMenuDerechaAction = () => {
        setAbrirDerecha(true);
    }
    const salirSesionApp = () => {
        localStorage.removeItem('token_seguridad');
        dispatch({
            type: "SALIR_SESION",
            nuevoUsuario: null,
            autenticado: false
        });
        dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
                open: true,
                mensaje: 'Sesión cerrada con éxito'
            }
        });
        props.history.push('/auth/login');
    }

    return (
        <React.Fragment>
            <Drawer
                open={abrirIzquierda}
                onClose={cerrarMenuIzquierda}
                anchor="left"
            >
                <div className={clases.list} onKeyDown={cerrarMenuIzquierda} onClick={cerrarMenuIzquierda}>
                    <MenuIzquierda clases={clases} usuario={sesionUsuario} />
                </div>
            </Drawer>
            <Drawer
                open={abrirDerecha}
                onClose={cerrarMenuDerecha}
                anchor="right"
            >
                <div role="button" onKeyDown={cerrarMenuDerecha} onClick={cerrarMenuDerecha}>
                    <MenuDerecha
                        clases={clases}
                        salirSesion={salirSesionApp}
                        usuario={sesionUsuario ? sesionUsuario.usuario : null}
                    />
                </div>
            </Drawer>
            <Toolbar>
                <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
                    <i className="material-icons">menu</i>
                </IconButton>
                <Button component={Link} to="/CursoInkIndex" style={{ color: "white" }}>
                    <Typography variant="h6">Curso Ink</Typography>
                </Button>
                <div className={clases.grow}></div>
                <div className={clases.seccionDesktop}>
                    <Button color="inherit" onClick={salirSesionApp}>Salir</Button>
                    <Button component={Link} to="/auth/perfil" color="inherit">{sesionUsuario ? sesionUsuario.usuario.userName : ""}</Button>
                    <Button component={Link} to="/auth/perfil" color="inherit">
                        <Avatar src={sesionUsuario.usuario.imagenPerfil || fotoUsuarioTemp}></Avatar>
                    </Button>
                </div>
                <div className={clases.seccionMobile}>
                    <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>

        </React.Fragment>
    )
}

export default withRouter(BarSesion);
