import { Avatar, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import fotoUsuarioTemp from '../../../standard-img/user.jpg';

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
        <List>
            <ListItem component={Link} button to="/misCursos">
                <i className="material-icons">menu_book</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Mis cursos" />
            </ListItem>
            <ListItem component={Link} button to="/misComunidades">
                <i className="material-icons">people_outline</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Mis comunidades" />
            </ListItem>
            <ListItem component={Link} button to="/misTemas">
                <i className="material-icons">people</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Mis temas" />
            </ListItem>
            <ListItem component={Link} button to="/misComentarios">
                <i className="material-icons">question_answer</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Mis comentarios" />
            </ListItem>
            <ListItem component={Link} button to="/misCompras">
                <i className="material-icons">receipt</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Mi historial de compras" />
            </ListItem>
            <ListItem component={Link} button to="/cursosAdquiridos">
                <i className="material-icons">attach_money</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Mis cursos adquiridos" />
            </ListItem>
        </List>
    </div >
);