import { useEffect, useState } from 'react';
import { obtenerUsuarioActual } from '../actions/UsuarioAction';

const useUsuario = () => {
    const [usuario, setUsuario] = useState({
        UserName: ''
    });

    useEffect(() => {
        obtenerUsuarioActual().then(response => {
            setUsuario(response.data);
        })
    }, [])


    return { usuario };
}

export default useUsuario;

