using Aplicacion.ManejadorError;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Temas
{
    public class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public Guid TemaId { get; set; }
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
                var tema = await _context.Tema.FindAsync(request.TemaId);
                if (tema == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el tema" });

                tema.Activo = !tema.Activo;

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al editar el tema");
            }
        }
    }
}
