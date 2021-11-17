import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';

const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        instancia.post('/usuarios/registrar', usuario).then(response => {
            dispatch({
                type: "INICIAR_SESION",
                sesion: response.data,
                autenticado: true
            });
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const obtenerUsuarioActual = (dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/usuarios').then(response => {
            if (response.data && response.data.imagenPerfil) {
                let fotoPerfil = response.data.imagenPerfil;
                const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                response.data.imagenPerfil = nuevoFile;
            }
            dispatch({
                type: "INICIAR_SESION",
                sesion: response.data,
                autenticado: true
            });
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const actualizarUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put('/usuarios', usuario)
            .then(response => {
                if (response.data && response.data.imagenPerfil) {
                    let fotoPerfil = response.data.imagenPerfil;
                    const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                    response.data.imagenPerfil = nuevoFile;
                }
                dispatch({
                    type: 'INICIAR_SESION',
                    sesion: response.data,
                    autenticado: true
                });
                resolve(response);
            })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const loginUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
        instancia.post('/usuarios/login', usuario).then(response => {
            if (response.data && response.data.imagenPerfil) {
                let fotoPerfil = response.data.imagenPerfil;
                const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                response.data.imagenPerfil = nuevoFile;
            }
            dispatch({
                type: "INICIAR_SESION",
                sesion: response.data,
                autenticado: true
            });
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}