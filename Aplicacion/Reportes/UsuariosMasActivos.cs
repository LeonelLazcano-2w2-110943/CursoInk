using Aplicacion.Seguridad;
using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Reportes
{
    public class UsuariosMasActivos
    {
        public string UsuarioId { get; set; }
        public string UserName { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public int CantidadCursos { get; set; }
        public int CantidadComunidades { get; set; }
        public int CantidadTemas { get; set; }
        public ImagenGeneral ImagenUsuariosMasActivos { get; set; }

    }
}
