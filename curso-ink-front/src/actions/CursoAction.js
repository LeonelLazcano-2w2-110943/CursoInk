import HttpCliente from '../servicios/HttpCliente';

export const nuevoCurso = async (curso, imagen) => {
    const endpointCurso = '/cursos';
    const promesaCurso = HttpCliente.post(endpointCurso, curso);
    if (imagen) {
        const endpointDocumento = '/documento';
        const promesaDocumento = HttpCliente.post(endpointDocumento, imagen);
        return await Promise.all([promesaCurso, promesaDocumento]);
    }
    else {
        return await Promise.all([promesaCurso]);
    }
}

export const suscribir = suscripcion => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/cursos/suscribir', suscripcion).then(response => {
            resolve(response);
        })
            .catch(error => {
                resolve(error.response);
            })
    });

}

export const obtenerCurso = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/cursos/' + id).then(response => {
            if (response.data && response.data.imagenCurso) {
                let fotoPerfil = response.data.imagenCurso;
                const nuevoFile = 'data:image/' + fotoPerfil.extension + ';base64,' + fotoPerfil.data;
                response.data.imagenCurso = nuevoFile;
            }
            resolve(response);
        });
    });
}

export const modificarCurso = (id, curso) => {
    return new Promise((resolve, eject) => {
        HttpCliente.put('/cursos/' + id, curso).then(response => {
            resolve(response);
        });
    });
}

export const deleteCurso = (id) => {
    return new Promise((resolve, eject) => {
        HttpCliente.delete('/cursos/' + id).then(response => {
            resolve(response);
        })
    });
}

export const paginacionCurso = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/cursos/report', paginador).then(response => {
            resolve(response);
        })
    });
}