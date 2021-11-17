using Aplicacion.Comunidades;
using Aplicacion.Cursos;
using Aplicacion.Temas;
using Dominio;
using JW;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistencia.Paginacion
{
    public class PaginacionModel
    {
        public PaginacionModel(int itemTotal, int paginaActual, int tamanoPagina)
        {
            pager = new Pager(totalItems: itemTotal, currentPage: paginaActual, pageSize: tamanoPagina);
        }
        public List<CursoDTO> ListaRecordsCurso { get; set; }
        public List<ComunidadDTO> ListaRecordsComunidad { get; set; }
        public List<TemaDTO> ListaRecordsTema { get; set; }
        public Pager pager { get; set; }
    }
}
