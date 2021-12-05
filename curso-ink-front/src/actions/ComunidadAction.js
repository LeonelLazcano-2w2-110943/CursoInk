import HttpCliente from '../servicios/HttpCliente';

export const nuevaComunidad = comunidad => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/comuninades', comunidad).then(response => {
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const obtenerComunidad = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/comuninades/' + id).then(response => {
            resolve(response);
        });
    });
}

export const modificarComunidad = (id, comunidad) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put('/comuninades/' + id, comunidad).then(response => {
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const listaComunidad = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/comuninades/').then(response => {
            resolve(response);
        });
    });
}

export const deleteComunidad = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.delete('/comuninades/' + id).then(response => {
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const ListaComunidadesPorUsuario = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/comuninades/ComunidadPorUsuario').then(response => {
            resolve(response);
        })
    });
}