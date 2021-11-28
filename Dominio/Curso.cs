using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dominio
{
    public class Curso
    {
        public Guid CursoId { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public ICollection<Comentario> ComentarioLista { get; set; }
        public ICollection<CursoUsuario> UsuariosSubscriptos { get; set; }
        public string UsuarioCreadorId { get; set; }
        public Usuario UsuarioCreador { get; set; }
        public bool Activo { get; set; }
        public string VideoUrl { get; set; }
        [Column(TypeName = "decimal(28,4)")]
        public decimal Precio { get; set; }
    }
}
