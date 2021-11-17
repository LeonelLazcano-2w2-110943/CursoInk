using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class CursoUsuario
    {
        public Guid CursoId { get; set; }
        public Curso Curso { get; set; }
        public string UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
