using Aplicacion.Comunidades;
using Aplicacion.Cursos;
using Aplicacion.Seguridad;
using Dominio;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Temas
{
    public class TemaDTO
    {
        public Guid TemaId { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public InstructorDTO UsuarioCreador { get; set; }
        public ComunidadDTO Comunidad { get; set; }
        public ICollection<ComentarioDTO> ListaComentarios { get; set; }
    }
}
