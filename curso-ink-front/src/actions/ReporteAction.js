import HttpCliente from '../servicios/HttpCliente';

export const getReporte = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/reportes').then(response => {
            if (response.data) {
                if (response.data.usuariosMasActivos != null) {
                    response.data.usuariosMasActivos.map((usuario) => {
                        if (usuario.imagenUsuariosMasActivos != null) {
                            let foto = usuario.imagenUsuariosMasActivos;
                            const nuevoFile = 'data:image/' + foto.extension + ';base64,' + foto.data;
                            usuario.imagenUsuariosMasActivos = nuevoFile;
                        }
                    });
                }
                if (response.data.usuariosRelevantes != null) {
                    response.data.usuariosRelevantes.map((usuario) => {
                        if (usuario.imagenUsuariosRelevantes != null) {
                            let foto = usuario.imagenUsuariosRelevantes;
                            const nuevoFile = 'data:image/' + foto.extension + ';base64,' + foto.data;
                            usuario.imagenUsuariosRelevantes = nuevoFile;
                        }
                    });
                }
                if (response.data.cursosRelevantes != null) {
                    response.data.cursosRelevantes.map((usuario) => {
                        if (usuario.imagenCursosRelevantes != null) {
                            let foto = usuario.imagenCursosRelevantes;
                            const nuevoFile = 'data:image/' + foto.extension + ';base64,' + foto.data;
                            usuario.imagenCursosRelevantes = nuevoFile;
                        }
                    });
                }
            }
            resolve(response);
        });
    });
}