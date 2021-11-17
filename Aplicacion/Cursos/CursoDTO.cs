using Aplicacion.Seguridad;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Cursos
{
    public class CursoDTO
    {
        public Guid CursoId { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool Activo { get; set; }
        public InstructorDTO Instructores { get; set; }
        public ImagenGeneral ImagenCurso { get; set; }
        public ICollection<InstructorDTO> Usuarios { get; set; }
        public ICollection<ComentarioDTO> Comentarios { get; set; }
    }
}
