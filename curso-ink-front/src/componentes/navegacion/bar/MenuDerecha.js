import { Avatar, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import fotoUsuarioTemp from '../../../logo.svg';

export const MenuDerecha = ({
    clases,
    usuario,
    salirSesion
}) => (
    <div className={clases.list} >
        <List>
            <ListItem component={Link} button>
                <Avatar src={usuario.imagenPerfil || fotoUsuarioTemp} />
                <ListItemText classes={{ primary: usuario.userName }} primary={usuario ? usuario.userName : ""} />
            </ListItem>
            <ListItem onClick={salirSesion} button>
                <ListItemText classes={{ primary: usuario.userName }} primary="Salir" />
            </ListItem>
        </List>
        <Divider />
    </div >
);