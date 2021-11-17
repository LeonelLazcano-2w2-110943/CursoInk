using Aplicacion.Seguridad;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Reportes
{
    public class CursosRelevantes
    {
        public Guid CursoId { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public int CantidadComentarios { get; set; }
        public int CantidadSuscriptores { get; set; }
        public ImagenGeneral ImagenCursosRelevantes { get; set; }

    }
}
