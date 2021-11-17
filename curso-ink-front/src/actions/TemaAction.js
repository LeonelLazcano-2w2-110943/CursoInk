import HttpCliente from '../servicios/HttpCliente';

export const nuevoTema = (id, tema) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/temas/' + id, tema).then(response => {
            resolve(response);
        });
    });
}

export const obtenerTema = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/temas/' + id).then(response => {
            resolve(response);
        });
    });
}

export const modificarTema = (id, tema) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put('/temas/' + id, tema).then(response => {
            resolve(response);
        });
    });
}

export const listaTemas = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/temas/').then(response => {
            resolve(response);
        });
    });
}

export const deleteTema = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.delete('/temas/' + id).then(response => {
            resolve(response);
        })
    });
}