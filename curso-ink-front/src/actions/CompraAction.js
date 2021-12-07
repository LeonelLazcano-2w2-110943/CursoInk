import HttpCliente from '../servicios/HttpCliente';

export const nuevaCompra = compra => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/compras', compra).then(response => {
            resolve(response);
        });
    });
}

export const listaComprasPorUsuario = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/compras').then(response => {
            resolve(response);
        });
    });
}

export const listaCursosComprados = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/compras/cursosComprados').then(response => {
            resolve(response);
        });
    });
}