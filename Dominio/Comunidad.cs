using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class Comunidad
    {
        public Guid ComunidadId { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Reglas { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string UsuarioCreadorId { get; set; }
        public Usuario UsuarioCreador { get; set; }
        public bool Activo { get; set; }
        public List<Tema> ListaTemas { get; set; }
    }
}
