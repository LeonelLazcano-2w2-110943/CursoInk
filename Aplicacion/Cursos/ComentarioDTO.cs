using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Cursos
{
    public class ComentarioDTO
    {
        public Guid ComentarioId { get; set; }
        public string Alumno { get; set; }
        public InstructorDTO AlumnoNombre { get; set; }
        public string ComentarioTexto { get; set; }
        public Guid? CursoId { get; set; }
        public Guid? TemaId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool Activo { get; set; }
    }
}
