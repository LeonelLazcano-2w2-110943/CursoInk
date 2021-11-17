import HttpCliente from '../servicios/HttpCliente';

export const nuevoRol = rol => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/rol/crear', rol).then(response => {
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const listaRoles = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/rol/').then(response => {
            resolve(response);
        });
    });
}

export const deleteRol = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.delete('/rol/eliminar/' + id).then(response => {
            resolve(response);
        });
    });
}

export const editRol = (rol) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put('/rol/', rol).then(response => {
            resolve(response);
        });
    });
}

export const getRol = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/rol/getRol/' + id).then(response => {
            resolve(response);
        })
    });
}