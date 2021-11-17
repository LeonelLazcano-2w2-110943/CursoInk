using Aplicacion.Seguridad;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Reportes
{
    public class ComunidadesMasRelevantes
    {
        public Guid ComunidadId { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public int CantidadTemas { get; set; }
        public ImagenGeneral ImagenComunidadesMasRelevantes { get; set; }

    }
}
