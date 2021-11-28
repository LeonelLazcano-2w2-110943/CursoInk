using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio
{
    public class Compra
    {
        public Guid CompraId { get; set; }
        public string Curso { get; set; }
        public string UserName { get; set; }
        public DateTime FechaCompra { get; set; }
    }
}
