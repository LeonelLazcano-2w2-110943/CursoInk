using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Seguridad
{
    public class UsuarioData
    {
        public string UsuarioId { get; set; }
        public string NombreCompleto { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Biografia { get; set; }
        public string Imagen { get; set; }
        public bool Activo { get; set; }
        public List<string> ListaRoles { get; set; }
        public ImagenGeneral ImagenPerfil { get; set; }
    }
}
