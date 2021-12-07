import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router';
import { editRol, getRol } from '../../actions/RolAction';
import { useStateValue } from '../../contexto/Store';
import style from '../Tool/Style';

export const EditarRol = (props) => {
    const { id } = useParams();
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [rol, setRol] = useState({
        name: '',
        id: id
    });

    const ingresarValoresMemoria = e => {
        const { name, value } = e.target;
        setRol(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    useEffect(() => {
        getRol(id).then(response => {
            console.log(response.data);

            setRol(response.data);
        });
    }, [])

    const editarRol = e => {
        e.preventDefault();

        editRol(rol).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Rol editado con éxito"
                    }
                });
                props.history.push("/listaRoles");
            }
            else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: 'Errores al intentar guardar: ' + Object.keys(response.data.errors)
                    }
                });
            }
        });
    }

    return (
        <Container>
            <div style={style.paper}>
                <Typography component="h1" variant="h4" style={style.titulos}>
                    Editar rol
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <TextField name="name" value={rol.name} onChange={ingresarValoresMemoria} variant="standard" fullWidth label="Ingrese el nombre del rol" />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button type="submit" onClick={editarRol} fullWidth variant="contained" color="primary" size="large" style={style.submit}>
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default withRouter(EditarRol);