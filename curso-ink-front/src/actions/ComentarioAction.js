import HttpCliente from '../servicios/HttpCliente';

export const nuevoComentario = comentario => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/comentarios', comentario).then(response => {
            resolve(response);
        });
    });
}

export const deleteComentario = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.delete('/comentarios/' + id).then(response => {
            resolve(response);
        })
    });
}

export const edicionComentario = comentario => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/comentarios/editarComentario', comentario).then(response => {
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}

export const listaComentarios = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/comentarios').then(response => {
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });
}