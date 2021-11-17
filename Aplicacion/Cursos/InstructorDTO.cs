using System;
using System.Collections.Generic;
using System.Text;

namespace Aplicacion.Cursos
{
    public class InstructorDTO
    {
        public string NombreCompleto { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Biografia { get; set; }
        public bool Activo { get; set; }
        public string UserName { get; set; }
        public List<string> ListaRoles { get; set; }
    }
}
