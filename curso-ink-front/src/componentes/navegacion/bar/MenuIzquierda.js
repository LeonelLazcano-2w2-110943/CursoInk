import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export const MenuIzquierda = ({ clases, usuario }) => (
    <div className={clases.list} >
        <List>
            <ListItem component={Link} button to="/auth/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Perfil" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/nuevoCurso">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Nuevo curso" />
            </ListItem>
            <ListItem component={Link} button to="/curso/paginador">
                <i className="material-icons">menu_book</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Lista de cursos" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/nuevaComunidad">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Nueva comunidad" />
            </ListItem>
            <ListItem component={Link} button to="/listaComunidades">
                <i className="material-icons">forum</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Comunidades" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem component={Link} button to="/listaTemas">
                <i className="material-icons">menu_book</i>
                <ListItemText classes={{ primary: clases.listItemText }} primary="Temas recientes" />
            </ListItem>
        </List>
        <Divider />
        {usuario.usuario.listaRoles != null &&
            usuario.usuario.listaRoles.map((rol) =>
                rol === "Admin" &&
                <List>
                    <ListItem component={Link} button to="/nuevoRol">
                        <i className="material-icons">add_box</i>
                        <ListItemText classes={{ primary: clases.listItemText }} primary="Nuevo rol" />
                    </ListItem>
                    <ListItem component={Link} button to="/listaRoles">
                        <i className="material-icons">list</i>
                        <ListItemText classes={{ primary: clases.listItemText }} primary="Lista de roles" />
                    </ListItem>
                </List>
            )
        }
    </div >
)
