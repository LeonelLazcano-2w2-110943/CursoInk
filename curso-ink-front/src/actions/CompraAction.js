import HttpCliente from '../servicios/HttpCliente';

export const nuevaCompra = compra => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/compras', compra).then(response => {
            resolve(response);
        });
    });
}