using Aplicacion.Cursos;
using Aplicacion.Temas;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Comunidades
{
    public class ComunidadDTO
    {
        public Guid ComunidadId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Reglas { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public InstructorDTO UsuarioCreador { get; set; }
        public bool Activo { get; set; }
        public ICollection<TemaDTO> ListaTemas { get; set; }
    }
}
