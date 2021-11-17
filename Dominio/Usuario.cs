using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class Usuario : IdentityUser
    {
        public string NombreCompleto { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Biografia { get; set; }
        public bool Activo { get; set; }
        public ICollection<CursoUsuario> ListaCursos { get; set; }
        public ICollection<Curso> ListaCursoInstructor { get; set; }
        public ICollection<Comunidad> ListaComunidadUsuarios { get; set; }
        public ICollection<Tema> ListaTemas { get; set; }

    }
}
