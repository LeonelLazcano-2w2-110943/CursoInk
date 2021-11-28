using Dominio;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Compras
{
    public class Nueva
    {
        public class Ejecuta : IRequest
        {
            public string Curso { get; set; }
            public string UserName { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursoInkContext _context;
            public Manejador(CursoInkContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var guid = new Guid();

                var compraNueva = new Compra
                {
                    CompraId = guid,
                    Curso = request.Curso,
                    UserName = request.UserName,
                    FechaCompra = DateTime.Now
                };

                _context.Compra.Add(compraNueva);

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al registrar la compra");
            }
        }
    }
}
