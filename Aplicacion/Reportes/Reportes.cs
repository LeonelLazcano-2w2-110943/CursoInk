using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Reportes
{
    public class Reportes
    {
        public ICollection<UsuariosMasActivos> UsuariosMasActivos { get; set; }
        public ICollection<UsuariosRelevantes> UsuariosRelevantes { get; set; }
        public ICollection<CursosRelevantes> CursosRelevantes { get; set; }
        public ICollection<ComunidadesMasRelevantes> ComunidadesMasRelevantes { get; set; }
        public ResumenGeneral ResumenGeneral { get; set; }
    }
}
