using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class Tema
    {
        public Guid TemaId { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string UsuarioCreadorId { get; set; }
        public Usuario UsuarioCreador { get; set; }
        public Guid ComunidadId { get; set; }
        public Comunidad Comunidad { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public bool Activo { get; set; }
        public ICollection<Comentario> ListaComentarios { get; set; }
    }
}
