import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { paginacionCurso } from '../../actions/CursoAction';
import ControlTyping from '../Tool/ControlTyping';
import style from '../Tool/Style';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../contexto/Store';

export default function PaginadorCurso() {
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [textoBusquedaCurso, setTextoBusquedaCurso] = useState("");
    const typingBuscadorTexto = ControlTyping(textoBusquedaCurso, 900);

    const [paginadorRequest, setPaginadorRequest] = useState({
        CurrentPage: 0,
        PageSize: 5,
        FiltroTitulo: '',
        FiltroDescripcion: ''
    });

    const [paginadorResponse, setPaginadorResponse] = useState({
        listaRecordsCurso: [],
        pager: {
            pageSize: 0,
            totalItems: 0
        }
    });

    useEffect(() => {

        const obtenerListaCurso = async () => {
            let tituloVariant = "";
            let paginaVariant = paginadorRequest.CurrentPage + 1;
            if (typingBuscadorTexto) {
                tituloVariant = typingBuscadorTexto;
                paginaVariant = 1;
            }
            const objetoPaginadorRequest = {
                CurrentPage: paginaVariant,
                PageSize: paginadorRequest.PageSize,
                FiltroTitulo: tituloVariant,
                FiltroDescripcion: paginadorRequest.FiltroDescripcion
            }
            const response = await paginacionCurso(objetoPaginadorRequest);
            setPaginadorResponse(response.data);
        }
        console.log(paginadorResponse);
        obtenerListaCurso();


    }, [paginadorRequest, typingBuscadorTexto])

    const cambiarPagina = (event, nuevaPagina) => {
        event.preventDefault();
        setPaginadorRequest((anterior) => ({
            ...anterior,
            CurrentPage: parseInt(nuevaPagina)
        }));
    }

    const cambiarCantidadRecords = (event) => {
        setPaginadorRequest((anterior) => ({
            ...anterior,
            PageSize: parseInt(event.target.value),
            CurrentPage: 0
        }));
    }
    return (
        <Container>
            <div style={{ padding: "10px", width: "100%" }}>
                <Typography component="h1" variant="h4" style={style.titulos}>Lista de cursos</Typography>
                <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <TextField
                            fullWidth
                            name="textoBusquedaCurso"
                            variant="outlined"
                            label="Busca tu curso"
                            onChange={e => setTextoBusquedaCurso(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid style={{ marginTop: "3%" }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Título</TableCell>
                                    <TableCell align="left">Descripcion</TableCell>
                                    <TableCell align="left">Fecha de publicación</TableCell>
                                    <TableCell align="left">Precio</TableCell>
                                    <TableCell align="left">Autor</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!paginadorResponse.listaRecordsCurso ? null :
                                    paginadorResponse.listaRecordsCurso.map((curso) => (
                                        curso.activo &&
                                        <TableRow key={curso.cursoId} component={Link} to={"/cursoIndex/" + curso.cursoId} style={style.cardLink}>
                                            <TableCell align="left">{curso.titulo}</TableCell>
                                            <TableCell align="left">{
                                                curso.descripcion.length > 200 ?
                                                    curso.descripcion.substring(0, 200) + "..."
                                                    :
                                                    curso.descripcion
                                            }</TableCell>
                                            <TableCell align="left">{(new Date(curso.fechaCreacion)).toLocaleDateString()}</TableCell>
                                            <TableCell align="left">{"$" + curso.precio}</TableCell>
                                            <TableCell align="left">{curso.instructores.userName}</TableCell>
                                            <TableCell align="left">
                                                <Button component={Link} size="small" color="primary" to={"/cursoIndex/" + curso.cursoId}>
                                                    Ingresar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        count={paginadorResponse.pager.totalItems}
                        rowsPerPage={paginadorRequest.PageSize}
                        page={paginadorRequest.CurrentPage}
                        onPageChange={cambiarPagina}
                        onRowsPerPageChange={cambiarCantidadRecords}
                        labelRowsPerPage="Cursos por pagina"
                    />
                </Grid>
            </div>
        </Container>
    )
}
