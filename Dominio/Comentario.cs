using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class Comentario
    {
        public Guid ComentarioId { get; set; }
        public string Alumno { get; set; }
        public string ComentarioTexto { get; set; }
        public Guid? CursoId { get; set; }
        public Curso Curso { get; set; }
        public Guid? TemaId { get; set; }
        public Tema Tema { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool Activo { get; set; }
    }
}
